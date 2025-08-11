"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tutorials = [
  {
    id: 1,
    title: "Next.js 15 Complete Guide",
    description: "Learn everything about Next.js 15 with hands-on examples and real-world projects.",
    link: "/tutorials/nextjs-guide",
    tags: ["Next.js", "React", "Web Dev"],
  },
  {
    id: 2,
    title: "Shadcn UI Mastery",
    description: "Build beautiful and accessible UI components with shadcn UI + TailwindCSS.",
    link: "/tutorials/shadcn-ui",
    tags: ["UI", "TailwindCSS", "Design"],
  },
  {
    id: 3,
    title: "React Animations with Framer Motion",
    description: "Add stunning animations and micro-interactions to your React apps.",
    link: "/tutorials/framer-motion",
    tags: ["React", "Framer Motion", "Animations"],
  },
];

export default function TutorialsPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-6"
      >
        📚 Tutorials
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center text-lg text-muted-foreground mb-12"
      >
        Learn with step-by-step guides, interactive examples, and hands-on coding challenges.
      </motion.p>

      {/* Tutorials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <Card className="group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/40">
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {tutorial.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{tutorial.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 * i }}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <Link href={tutorial.link}>
                  <Button variant="outline" className="w-full group-hover:scale-105 transition-transform">
                    Start Learning →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
