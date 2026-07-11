"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/navigation";
import { SITE } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold">
          <span
            className={
              scrolled ? "text-[#12372A]" : "text-white"
            }
          >
            {SITE.name}
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`transition-colors ${
                scrolled
                  ? "text-gray-800 hover:text-[#12372A]"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {item.title}
            </Link>
          ))}

          <Button>
            Book Now
          </Button>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? (
            <X
              className={scrolled ? "text-black" : "text-white"}
            />
          ) : (
            <Menu
              className={scrolled ? "text-black" : "text-white"}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col gap-5 p-6">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            <Button>
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}