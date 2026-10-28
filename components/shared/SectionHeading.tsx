interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 ${
        centered ? "text-center" : "text-left"
      }`}
    >
      <p className="uppercase tracking-[0.35em] text-sm text-gray-500">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
        {title}
      </h2>

      <p
        className={`mt-4 text-base leading-7 text-gray-600 sm:text-lg ${
          centered
            ? "mx-auto max-w-3xl"
            : "max-w-2xl"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
