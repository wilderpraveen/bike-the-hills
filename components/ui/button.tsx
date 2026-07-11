import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = clsx(
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm md:text-base font-semibold transition-all duration-300",
    {
      "bg-[#12372A] text-white hover:bg-[#0d2a20]":
        variant === "primary",

      "border border-white text-white hover:bg-white hover:text-black":
        variant === "secondary",
    },
    className
  );

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}