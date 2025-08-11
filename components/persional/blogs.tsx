"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const blogs = [
  {
    id: 1,
    title: "Building Rutron: My Personal Website Journey",
    description: "How I created Rutron with Next.js, MongoDB, and Shadcn UI while keeping design modern and interactive.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    link: "/blogs/rutron-journey",
  },
  {
    id: 2,
    title: "Mastering Framer Motion for Stunning Animations",
    description: "Step-by-step guide to using Framer Motion for interactive animations in your projects.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    link: "/blogs/framer-motion-guide",
  },
  {
    id: 3,
    title: "Next.js + Shadcn: Perfect UI Combo",
    description: "Why Next.js and Shadcn UI make an unbeatable pair for building modern, responsive websites.",
    image: "https://images.unsplash.com/photo-1522205152479-9c052a2db48a",
    link: "/blogs/next-shadcn-combo",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

export default function BlogsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-background to-muted/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Latest Blogs</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer border border-border/40 bg-card"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-4">{blog.description}</p>
                <Link
                  href={blog.link}
                  className="text-primary font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
