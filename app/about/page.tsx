"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const skillGroups = [
  {
    category: "Web Development",
    skills: ["Next.js", "React", "Tailwind CSS", "shadcn UI"],
  },
  {
    category: "Mobile Development",
    skills: ["Flutter", "Android Development"],
  },
  {
    category: "AI & Data Science",
    skills: ["AI & Machine Learning", "Data Science", "Python"],
  },
  {
    category: "Languages & Frameworks",
    skills: ["Java", "C#", "Python"],
  },
  {
    category: "Game Development",
    skills: ["Unity", "C#"],
  },
];

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -20]);
  const y2 = useTransform(scrollY, [0, 400], [0, -30]);

  return (
    <section className="relative min-h-screen bg-background text-foreground py-24 px-6 md:px-20 overflow-hidden">
      {/* subtle parallax background circles with theme colors */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute -left-40 top-20 w-96 h-96 rounded-full bg-primary/30 opacity-20 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute right-20 top-48 w-[380px] h-[380px] rounded-full bg-secondary/30 opacity-20 blur-3xl"
      />

      {/* Header / Hero */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center select-none"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Who Am I?
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
        >
          I am <span className="font-semibold">Rohit Verma</span>, a passionate
          developer who crafts delightful, blazing-fast websites and apps with modern
          technologies. I love coding, learning new things, and solving problems creatively.
        </motion.p>
      </motion.div>

      {/* Profile + Bio */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="flex flex-col md:flex-row items-center justify-center gap-12 mt-20 max-w-6xl mx-auto"
      >
        {/* Profile Image */}
        <div className="relative w-64 h-64 rounded-full border border-border shadow-md overflow-hidden hover:scale-105 transition-transform duration-500 cursor-pointer">
          <Image
            src="/user.jpg"
            alt="Rohit Verma"
            fill
            className=""
            priority
          />
          {/* <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/20 rounded-full pointer-events-none" /> */}
        </div>

        {/* Bio Card */}
        <Card className="bg-background/80 backdrop-blur-sm border border-border shadow-lg max-w-xl text-foreground">
          <CardContent className="space-y-6 px-8 py-8">
            <p className="text-lg leading-relaxed">
              I am a full-stack enthusiast skilled in web development, mobile apps,
              AI/ML, and game development. I blend creativity and technology to build
              meaningful projects that deliver value and joy.
            </p>
            <p className="text-sm opacity-80 italic">
              Outside coding, I love gaming, experimenting with new tech, and mentoring
              fellow developers.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills Section */}
      <motion.div className="mt-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 select-none">
          My Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {skillGroups.map(({ category, skills }) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-background/70 backdrop-blur-sm border border-border rounded-xl p-6 shadow"
            >
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    <Badge
                      variant="secondary"
                      className="text-sm px-5 py-2 font-semibold shadow-sm"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
