"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Big, animated Projects Page for Rutron
 * - Animated hero
 * - Filter chips
 * - Staggered entry
 * - Per-card 3D tilt on mouse move (CSS vars updated via RAF)
 * - Hover glow, overlay and action buttons
 */

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    id: "easytool",
    title: "EasyToolSpace",
    description: "Free utilities — image-to-text, TTS, PDF tools & more. Lightweight, fast, practical.",
    image: "/projects/easytool.jpg",
    tags: ["Next.js", "Shadcn UI", "Vercel"],
    demo: "https://easytoolspace.vercel.app",
    repo: "#",
  },
  {
    id: "hiquizz",
    title: "HiQuizz Platform",
    description: "Quiz builder with user dashboards, results analytics and shareable links.",
    image: "/projects/hiquizz.jpg",
    tags: ["React", "MongoDB", "Tailwind"],
    demo: "#",
    repo: "#",
  },
  {
    id: "placement",
    title: "Training & Placement System",
    description: "Role-based placement portal (Admin / HR / Student) with job pipelines and reports.",
    image: "/projects/placement.jpg",
    tags: ["Flask", "Postgres", "Auth"],
    demo: "#",
    repo: "#",
  },
  // add more projects...
];

/* Framer motion variants */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 160, damping: 18 } },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const tags = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

  const filtered = PROJECTS.filter((p) => {
    const okTag = filter === "All" ? true : p.tags.includes(filter);
    const okQuery = query.trim() === "" ? true : (p.title + p.description).toLowerCase().includes(query.toLowerCase());
    return okTag && okQuery;
  });

  return (
    <main className="min-h-screen bg-background/50">
      {/* Hero */}
      <header className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Projects
              <span className="ml-3 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                .
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="origin-left w-48 h-1 mt-4 rounded bg-gradient-to-r from-primary to-purple-500"
            />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Selected projects I built — focused on performance, accessibility and delightful UI.
              Click any card to open demo or repository.
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Button
                  key={t}
                  onClick={() => setFilter(t)}
                variant={filter==t?"default":"outline"}
                >
                  {t}
                </Button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="bg-card border border-border/40 rounded-lg px-3 py-2 text-sm w-full md:w-72 outline-none focus:ring-2 focus:ring-primary/40"
              />
              <Button variant="secondary" size="lg" onClick={() => { setQuery(""); setFilter("All"); }}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p, idx) => (
                <motion.div key={p.id} >
                  <TiltCard project={p} index={idx} />
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full py-16 text-center text-muted-foreground">No projects match your search.</div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* --- TiltCard component: mouse-driven 3D tilt + hover overlay --- */
function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
        if (el===null) return;
      const r = el?.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width; // 0..1
      const y = (e.clientY - r.top) / r.height; // 0..1
      mouse.current.x = (x - 0.5) * 2; // -1..1
      mouse.current.y = (y - 0.5) * 2;
    }
    function update() {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if (el) {
        el.style.setProperty("--rx", `${-pos.current.y * 8}deg`); // rotateX
        el.style.setProperty("--ry", `${pos.current.x * 10}deg`); // rotateY
        el.style.setProperty("--sx", `${1 + Math.abs(pos.current.x) * 0.02}`);
        el.style.setProperty("--sy", `${1 + Math.abs(pos.current.y) * 0.02}`);
        el.style.setProperty("--g", `${Math.max(0.08, Math.abs(pos.current.x) * 0.22)}`);
      }
      rafRef.current = requestAnimationFrame(update);
    }
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <article
      ref={ref}
      style={{
        // initial CSS variables
        ["--rx" as string]: "0deg",
        ["--ry" as string]: "0deg",
        ["--sx" as string]: "1",
        ["--sy" as string]: "1",
        ["--g" as string]: "0.08",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.6 }}
        className="relative will-change-transform transform-gpu"
        style={{
          transform: `perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)) scale3d(var(--sx), var(--sy), 1)`,
        }}
      >
        <Card className="overflow-hidden rounded-2xl border border-border/40 shadow-xl">
          <div className="relative h-44 w-full bg-zinc-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* top-left tag */}
            <div className="absolute left-3 top-3">
              <Badge variant="secondary">{project.tags[0]}</Badge>
            </div>
          </div>

          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-lg">{project.title}</CardTitle>
          </CardHeader>

          <CardContent className="px-6 pb-6 pt-0">
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

            <div className="flex gap-2 flex-wrap mb-4">
              {project.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-md bg-muted/20">
                  {t}
                </span>
              ))}
            </div>

            {/* action row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <Button size="sm">Open Demo</Button>
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="sm">Code</Button>
                  </a>
                )}
              </div>

              {/* subtle animated pill showing index */}
              <div
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: `linear-gradient(90deg, rgba(99,102,241,0.12), rgba(124,58,237,0.06))`,
                }}
              >
                #{index + 1}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* hover glow overlay (pure css, fades in on hover) */}
        <style jsx>{`
          article :global(.card) {}
          article :global(.card:hover) {
            box-shadow: 0 18px 60px rgba(13, 17, 23, 0.6);
          }
          article :global(.card img) {
            transform-origin: center;
          }
          article :global(.card:hover img) {
            transform: scale(1.06);
          }
          article {
            transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
          }
        `}</style>
      </motion.div>
    </article>
  );
}
