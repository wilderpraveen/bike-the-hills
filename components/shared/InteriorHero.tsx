import Image from "next/image";

interface InteriorHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

export default function InteriorHero({
  eyebrow,
  title,
  description,
  image,
}: InteriorHeroProps) {
  return (
    <header className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-[#102C23] px-6 pb-14 pt-32 sm:min-h-[500px] sm:px-10 sm:pb-16 lg:min-h-[560px] lg:px-16">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/40 to-black/15" />
      <div className="mx-auto w-full max-w-7xl text-white">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#E4C982] sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-playfair text-5xl font-bold leading-[1.06] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
    </header>
  );
}
