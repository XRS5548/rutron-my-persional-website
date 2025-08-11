// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { RutronLogo } from "./navbar";

export default function Footer() {
  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/yourusername" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yourusername" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/yourusername" },
    { icon: <Mail size={20} />, href: "mailto:youremail@example.com" },
  ];

  return (
    <footer className="relative bg-black text-white py-10 px-6 mt-16">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6"
      >
        {/* Brand / Logo */}
        <motion.h1
          className="text-2xl font-bold tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <RutronLogo className="scale-150" />
        </motion.h1>

        {/* Social Links */}
        <motion.div
          className="flex gap-6"
          initial="hidden"
          whileInView="show"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {socialLinks.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.p
          className="text-sm text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} Rutron — Made with ❤️ by Rohit Verma
        </motion.p>
      </motion.div>
    </footer>
  );
}
