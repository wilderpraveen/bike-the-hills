type GoogleReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string; languageCode?: string };
  originalText?: { text?: string; languageCode?: string };
  googleMapsUri?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
};

type GooglePlaceResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

type GoogleSearchResponse = {
  places?: Array<{
    id?: string;
    displayName?: { text?: string };
    formattedAddress?: string;
  }>;
};

type GoogleApiErrorResponse = {
  error?: { message?: string };
};

let cachedPlaceId: string | undefined;

async function findPlaceId(apiKey: string) {
  if (cachedPlaceId) return cachedPlaceId;

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery:
        "Bike The Hills, Shop-1, Kumzum Shoping Complex, Main Market, Kaza, Himachal Pradesh 172114",
      languageCode: "en",
      regionCode: "IN",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | GoogleApiErrorResponse
      | null;
    const reason = errorBody?.error?.message?.toLowerCase() ?? "";

    if (reason.includes("billing")) {
      throw new Error(
        "Google billing is not active for the project that owns this API key.",
      );
    }
    if (reason.includes("ip address") || reason.includes("referer")) {
      throw new Error(
        "The API key restriction is blocking this server. Check its allowed IP addresses; website referrer restrictions do not apply to this server request.",
      );
    }
    if (reason.includes("api key not valid")) {
      throw new Error(
        "Google rejected this API key. Check that the value in .env.local is the key from the same Google Cloud project.",
      );
    }
    throw new Error(
      "Google denied the Places lookup. Confirm Places API (New), billing, and the key's API and application restrictions in the same Cloud project.",
    );
  }

  const result = (await response.json()) as GoogleSearchResponse;
  const match = result.places?.find(
    (place) => place.displayName?.text?.toLowerCase() === "bike the hills",
  );

  if (!match?.id) {
    throw new Error("Could not match the Bike the Hills listing in Google Places.");
  }

  cachedPlaceId = match.id;
  return cachedPlaceId;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Google reviews are not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const placeId = await findPlaceId(apiKey);

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,googleMapsUri,reviews",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return Response.json(
        { error: "Google reviews could not be loaded." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const place = (await response.json()) as GooglePlaceResponse;
    const reviews = (place.reviews ?? []).map((review) => ({
      name: review.authorAttribution?.displayName ?? "Google reviewer",
      authorUrl: review.authorAttribution?.uri,
      rating: review.rating ?? 0,
      date: review.relativePublishTimeDescription,
      text: review.text?.text ?? "",
      translated:
        Boolean(review.originalText?.languageCode) &&
        review.originalText?.languageCode !== review.text?.languageCode,
      reviewUrl: review.googleMapsUri,
    }));

    return Response.json(
      {
        businessName: place.displayName?.text ?? "Bike the Hills",
        rating: place.rating ?? null,
        reviewCount: place.userRatingCount ?? null,
        googleMapsUrl: place.googleMapsUri,
        reviews,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Google reviews could not be loaded.",
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
