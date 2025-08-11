"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * HeroRutron (updated)
 * - Uses /user.jpg as background (place your image at public/user.jpg)
 * - Floating project card now shows EasyToolSpace with external link
 * - Typewriter, parallax, gradient blobs, wave divider unchanged
 *
 * How to use:
 *  - Install framer-motion: `npm i framer-motion`
 *  - Save as components/HeroRutron.tsx and import into your page (app/page.tsx or pages/index.tsx)
 */

const BG = "/user.jpg"; // ensure public/user.jpg exists

function useTypewriter(words: string[], speed = 60, pause = 1400) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (!isDeleting && charIndex === currentWord.length) {
      const t = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const delta = isDeleting ? Math.round(speed / 2) : speed;
    const timer = setTimeout(() => {
      setCharIndex((c) => c + (isDeleting ? -1 : 1));
    }, delta);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, speed, pause]);

  const text = words[wordIndex].slice(0, charIndex);
  return { text, cursorVisible };
}

export default function HeroRutron() {
  const roles = useMemo(
    () => ["Full-stack Developer", "Next.js & React", "UI/UX Lover", "Open-Source Contributor"],
    []
  );

  const { text: roleText, cursorVisible } = useTypewriter(roles, 50, 1500);

  // parallax handling
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (el == null) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width; // -0.5..0.5
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      target.current.x = x;
      target.current.y = y;
    }

    function animate() {
      // ease towards target
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      // update background position via transform on element -- use CSS variables
      if (el) {
        el.style.setProperty("--px", String(pos.current.x * 24));
        el.style.setProperty("--py", String(pos.current.y * 18));
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const controls = useAnimation();
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } });
  }, [controls]);

  return (
    <section
      ref={containerRef}
      aria-label="Rutron hero"
      className="relative w-full min-h-[76vh] flex items-center overflow-hidden"
    >
      {/* Background image with parallax via CSS variables */}
      <div
        aria-hidden
        className="absolute inset-0 will-change-transform bg-cover bg-center transform-gpu"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundPosition: "center",
          transform: "translate3d(var(--px,0px), var(--py,0px), 0) scale(1.06)",
          filter: "saturate(0.95) contrast(0.95)",
        }}
      />

      {/* subtle overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/70 backdrop-blur-sm" />

      {/* animated gradient blobs */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.9 }}
        className="pointer-events-none absolute -left-24 top-8 w-[680px] h-[680px] rounded-full opacity-40 blur-3xl"
        style={{
          background: "linear-gradient(135deg,var(--g1,rgba(96,165,250,0.28)),var(--g2,rgba(139,92,246,0.24)))",
        }}
      />

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.9 }}
        className="pointer-events-none absolute right-6 bottom-10 w-56 h-56 rounded-full opacity-30 blur-2xl"
        style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.18), rgba(245,158,11,0.16))" }}
      />

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
          {/* Left column: headings */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={controls} className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider mb-3">Hello, I am</p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Rutron
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="ml-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
              >
                .
              </motion.span>
            </h1>

            {/* animated underline (grows from left) */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="origin-left w-40 h-1 mt-4 rounded bg-gradient-to-r from-primary to-purple-500"
              style={{ transformOrigin: "left" }}
            />

            {/* Typewriter */}
            <div className="mt-6 text-lg md:text-xl font-medium">
              <span>{roleText}</span>
              <span aria-hidden className="inline-block ml-1" style={{ opacity: cursorVisible ? 1 : 0 }}>
                <strong>|</strong>
              </span>
            </div>

            <p className="mt-6 max-w-xl text-sm text-muted-foreground">
              I craft fast, accessible web experiences and clean UIs. I love mentoring, open-source, and
              turning ideas into delightful products.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects">
                <Button size="lg">See Projects</Button>
              </Link>
              <Link href="/hireme">
                <Button size="lg" variant="outline">
                  Hire me
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right column: EasyToolSpace floating preview card */}
          <div className="w-full md:w-[420px] flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 18, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="w-[320px] md:w-[380px] rounded-2xl p-5 bg-background/60 backdrop-blur border cursor-pointer hover:-translate-y-2 transition-transform"
              style={{ boxShadow: "0 16px 50px rgba(2,6,23,0.45)" }}
              onClick={() => window.open("https://easytoolspace.vercel.app", "_blank", "noopener")}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted/20 flex items-center justify-center">
                  {/* If you have a screenshot at /public/easytool-preview.png place it here */}
                  <img
                    src="/easytool-preview.png"
                    alt="EasyToolSpace preview"
                    onError={(e) => {
                      // fallback to a simple logo text if image not found
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="text-xs font-semibold">ETS</div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">EasyToolSpace</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Free web utilities — image-to-text, text-to-speech, converters & developer tools.
                  </p>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded-md border">React</span>
                    <span className="text-xs px-2 py-1 rounded-md border">Next.js</span>
                    <span className="text-xs px-2 py-1 rounded-md border">Free Tools</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Live site</div>
                <a
                  href="https://easytoolspace.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm">Visit</Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SVG wave divider */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 md:h-28">
          <path d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,100 L1200,120 L0,120 Z" className="fill-current text-background" />
        </svg>
      </div>

      {/* subtle bottom underline animation */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center z-20">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-[260px] h-0.5 rounded bg-gradient-to-r from-primary to-purple-500"
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
