"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  date: string;
};

const BLOGS: Blog[] = [
  {
    id: "b1",
    title: "Building Rutron: My Personal Website Journey",
    excerpt: "How I built Rutron using Next.js, Shadcn UI and Framer Motion — design decisions & lessons.",
    content:
      `Full article content goes here. You can paste markdown-rendered HTML or load it from your CMS. 
      This demo shows the modal reader and progress bar.`,
    image: "/blogs/rutron-journey.jpg",
    tags: ["Next.js", "Design"],
    date: "Aug 11, 2025",
  },
  {
    id: "b2",
    title: "Mastering Framer Motion for Smooth UI",
    excerpt: "Practical patterns for animations that feel natural and performant.",
    content: "Long form content for framer motion post ...",
    image: "/blogs/framer.jpg",
    tags: ["Framer Motion", "UI"],
    date: "Jul 28, 2025",
  },
  {
    id: "b3",
    title: "Next.js + Shadcn: Design System Tips",
    excerpt: "How to keep consistent design tokens and UI components across pages.",
    content: "Article content for design system ...",
    image: "/blogs/shadcn.jpg",
    tags: ["Next.js", "Shadcn UI"],
    date: "Jun 05, 2025",
  },
];

/* Framer variants */
const listVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");
  const [open, setOpen] = useState<Blog | null>(null);

  const tags = useMemo(() => ["All", ...Array.from(new Set(BLOGS.flatMap((b) => b.tags)))], []);
  const filtered = useMemo(
    () =>
      BLOGS.filter((b) => {
        const okTag = tag === "All" ? true : b.tags.includes(tag);
        const okQuery =
          query.trim() === ""
            ? true
            : (b.title + " " + b.excerpt + " " + b.content).toLowerCase().includes(query.toLowerCase());
        return okTag && okQuery;
      }),
    [tag, query]
  );

  return (
    <main className="min-h-screen px-6 md:px-12 lg:px-20 py-12">
      {/* Header */}
      <section className="max-w-6xl mx-auto mb-8">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Blogs
            <span className="ml-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">.</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Read my latest posts on web development, UI/UX, and tips & tricks. Click any card to open a smooth reader.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Button
                key={t}
                size="sm"
                variant={t === tag ? "default" : "outline"}
                onClick={() => setTag(t)}
                className="text-sm"
              >
                {t}
              </Button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="bg-card border border-border/40 rounded-lg px-3 py-2 text-sm w-full md:w-80 outline-none focus:ring-2 focus:ring-primary/40"
            />
            <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setTag("All"); }}>
              Reset
            </Button>
          </div>
        </div>
      </section>

      {/* Blog list */}
      <section className="max-w-6xl mx-auto">
        <motion.div variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <motion.article key={post.id}  whileHover={{ scale: 1.03 }}>
                <CardClickable post={post} onOpen={() => setOpen(post)} />
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && <div className="mt-14 text-center text-muted-foreground">No posts found.</div>}
        </motion.div>
      </section>

      {/* Reader Modal */}
      {open && <ReaderModal post={open} onClose={() => setOpen(null)} />}
    </main>
  );
}

/* --- Card (clickable) --- */
function CardClickable({ post, onOpen }: { post: Blog; onOpen: () => void }) {
  return (
    <div className="cursor-pointer" onClick={onOpen}>
      <Card className="h-full overflow-hidden rounded-2xl border border-border/40 shadow-lg hover:shadow-2xl transition-shadow">
        {post.image && (
          <div className="relative h-44 w-full bg-zinc-800">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
          </div>
        )}
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {post.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">{post.date}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* --- Modal / Reader --- */
function ReaderModal({ post, onClose }: { post: Blog; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    function onScroll() {
      const el = contentRef.current;
      if (!el) return;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = el.scrollTop;
      const p = total <= 0 ? 100 : Math.min(100, Math.round((scrolled / total) * 100));
      setProgress(p);
    }
    const el = contentRef.current;
    if (el) el.addEventListener("scroll", onScroll);
    return () => {
      if (el) el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      ref={overlayRef}
    >
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      {/* modal panel */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative z-10 w-[min(1100px,96%)] max-h-[85vh] bg-background rounded-2xl border border-border/40 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={post.title}
      >
        {/* progress bar */}
        <div className="h-1 bg-muted/20">
          <div className="h-1 bg-gradient-to-r from-primary to-purple-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* content scroll area */}
        <div ref={contentRef} className="p-8 overflow-auto max-h-[calc(85vh-48px)]">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">{post.title}</h2>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-sm text-muted-foreground">{post.date}</div>
              <div className="flex gap-2">
                {post.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          {/* if image exists show large hero */}
          {post.image && (
            <div className="relative w-full h-64 md:h-96 mb-6 rounded-xl overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {/* article body (replace with MD renderer if needed) */}
          <article className="prose prose-invert max-w-none text-sm md:text-base">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>

          {/* footer actions */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/blog/${post.id}`}>Open full page</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                Print
              </Button>
            </div>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
