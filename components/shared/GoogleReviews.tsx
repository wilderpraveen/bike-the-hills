"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";

type Review = {
  name: string;
  authorUrl?: string;
  rating: number;
  date?: string;
  text: string;
  translated: boolean;
  reviewUrl?: string;
};

type ReviewsResponse = {
  businessName: string;
  rating: number | null;
  reviewCount: number | null;
  googleMapsUrl?: string;
  reviews: Review[];
};

const GOOGLE_REVIEWS_URL = "https://share.google/JoTCOdEJcsxItILkz";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          size={16}
          className={index < Math.round(rating) ? "fill-[#C79A3B] text-[#C79A3B]" : "text-gray-300"}
        />
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState<ReviewsResponse | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/google-reviews", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((reviews: ReviewsResponse | null) => {
        if (active && reviews) setData(reviews);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  const googleMapsUrl = data?.googleMapsUrl ?? GOOGLE_REVIEWS_URL;

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="google-reviews-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#12372A]">
              Rider reviews
            </p>
            <h2 id="google-reviews-heading" className="mt-3 font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
              From riders who’ve been there
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              Read feedback from people who have explored Spiti with Bike the Hills.
            </p>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#12372A]/20 px-5 py-3 font-semibold text-[#12372A] transition-colors hover:bg-stone-50"
          >
            See all Google reviews <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        {data?.reviews.length ? (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-gray-200 bg-stone-50 px-5 py-4">
              <span className="font-playfair text-3xl font-bold text-gray-900">
                {data.rating?.toFixed(1)}
              </span>
              <Stars rating={data.rating ?? 0} />
              <span className="text-sm text-gray-600">
                {data.reviewCount} Google reviews
              </span>
              <span className="text-sm text-gray-500" translate="no">
                Google Maps
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.reviews.slice(0, 3).map((review, index) => (
                <article key={`${review.name}-${index}`} className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <Stars rating={review.rating} />
                    {review.date ? <span className="text-sm text-gray-500">{review.date}</span> : null}
                  </div>
                  <p className="mt-5 flex-1 leading-7 text-gray-700">{review.text}</p>
                  {review.translated ? (
                    <p className="mt-3 text-xs text-gray-500">Translated by Google</p>
                  ) : null}
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
                    {review.authorUrl ? (
                      <a className="font-semibold text-gray-900 hover:underline" href={review.authorUrl} target="_blank" rel="noreferrer">
                        {review.name}
                      </a>
                    ) : (
                      <span className="font-semibold text-gray-900">{review.name}</span>
                    )}
                    {review.reviewUrl ? (
                      <a className="inline-flex items-center gap-1 text-sm font-medium text-[#12372A] hover:underline" href={review.reviewUrl} target="_blank" rel="noreferrer">
                        View on Google <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-500">
              Reviews are shown in the order Google Maps returns them. Google checks reviews for policy violations but does not verify every review. See Google’s{" "}
              <a className="underline underline-offset-2 hover:text-gray-700" href="https://support.google.com/contributionpolicy/answer/7400114?hl=en" target="_blank" rel="noreferrer">
                review policy
              </a>.
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
