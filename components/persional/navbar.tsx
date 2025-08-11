"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <RutronLogo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium group"
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile Menu (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4 pt-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button size="sm">Get Started</Button>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}




type Size = "sm" | "md" | "lg" | number;

interface RutronLogoProps {
  size?: Size; // "sm" | "md" | "lg" | number(px)
  showText?: boolean; // show "Rutron" wordmark
  href?: string; // if provided, logo becomes a link
  className?: string;
}

const sizeMap = {
  sm: 28,
  md: 36,
  lg: 44,
};




export function RutronLogo({
  size = "md",
  showText = true,
  href,
  className = "",
}: RutronLogoProps) {
  const pxSize = typeof size === "number" ? size : sizeMap[size];
  const stroke = 2.2;
  const svgSize = pxSize; // square SVG for monogram

  // framer-motion variants
  const container = {
    rest: { scale: 1 },
    hover: { scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 18 } },
  };

  const pathDraw = {
    hidden: { pathLength: 0, opacity: 0.6 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const wordAnim = {
    hidden: { y: 6, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.12, duration: 0.6 } },
  };

  const LogoInner = (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`flex items-center gap-3 select-none ${className}`}
      aria-label="Rutron — personal website logo"
      role="img"
    >
      {/* SVG Monogram */}
      <motion.svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={false}
        className="flex-shrink-0"
      >
        <title>Rutron logo</title>

        {/* Gradient used for fill */}
        <defs>
          <linearGradient id="rutron-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--tw-gradient-from, #6366f1)" />
            <stop offset="55%" stopColor="var(--tw-gradient-to, #a78bfa)" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Circular background */}
        <motion.circle
          cx="24"
          cy="24"
          r="22"
          fill="url(#rutron-grad)"
          opacity={0.12}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.9 } }}
        />

        {/* Stylized R path (stroke draw animation) */}
        <motion.path
          d="M15 34 V14 C15 11.7909 16.7909 10 19 10 H27 C30 10 33 12 33 16 C33 19.5 30 22 27 22 H22 C19.7909 22 18 23.7909 18 26 C18 28.2091 19.7909 30 22 30 H28"
          stroke="url(#rutron-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial="hidden"
          animate="visible"
        />

        {/* small dot / accent */}
        <motion.circle
          cx="33.8"
          cy="16.2"
          r="1.3"
          fill="url(#rutron-grad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.85, duration: 0.4 } }}
        />
      </motion.svg>

      {/* Wordmark */}
      {showText && (
        <motion.span
          initial="hidden"
          animate="visible"
          variants={wordAnim}
          className="font-semibold text-lg leading-none"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Rutron
          </span>
        </motion.span>
      )}
    </motion.div>
  );

  if (href) {
    // Next.js Link wrapper
    return (
      <Link href={href} aria-label="Go to home">
        {LogoInner}
      </Link>
    );
  }

  return LogoInner;
}
