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
      className={`mb-16 ${
        centered ? "text-center" : "text-left"
      }`}
    >
      <p className="uppercase tracking-[0.35em] text-sm text-gray-500">
        {eyebrow}
      </p>

      <h2 className="mt-4 font-playfair text-5xl font-bold text-gray-900">
        {title}
      </h2>

      <p
        className={`mt-6 text-lg leading-8 text-gray-600 ${
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