"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    NAV_LINKS.filter((link) => link.href.includes("#")).forEach((link) => {
      const hash = link.href.slice(link.href.indexOf("#"));
      const node = document.querySelector(hash);
      if (node) {
        observer.observe(node);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open ? "bg-neutral-50 shadow-md" : "bg-transparent"
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2 text-primary-300">
          <Leaf className="h-6 w-6" aria-hidden />
          <span className="font-bold">Earth S.O.S.</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("min-h-11 py-3 text-sm font-semibold text-neutral-600 hover:text-primary-400", (active === link.href || pathname === link.href) && "text-primary-300")}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button className="flex min-h-11 min-w-11 items-center justify-center rounded md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block min-h-11 border-b border-neutral-200 py-4 text-lg font-semibold text-neutral-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
};
