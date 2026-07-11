"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/button";

const links = [
  { title: "Home", href: "/" },
  { title: "Tours", href: "#" },
  { title: "Destinations", href: "#" },
  { title: "Gallery", href: "#" },
  { title: "About", href: "#" },
  { title: "Contact", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        <h1 className="text-2xl font-bold tracking-wide text-white">
          Bike the Hills
        </h1>

        <ul className="hidden lg:flex items-center gap-10 text-white">

          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                className="hover:text-yellow-300 transition-colors"
              >
                {link.title}
              </a>
            </li>
          ))}

        </ul>

        <div className="hidden lg:block">
          <Button href="#" variant="secondary">
            Book Now
          </Button>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-black/95 text-white px-6 py-8">

          <div className="flex flex-col gap-6">

            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg"
              >
                {link.title}
              </a>
            ))}

            <Button href="#" variant="primary">
              Book Your Adventure
            </Button>

          </div>
        </div>
      )}
    </header>
  );
}