"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";

const contactMethods = [
  {
    id: "email",
    label: "Email Me",
    value: "myonlineworking5548@gmail.com",
    icon: Mail,
    href: "mailto:myonlineworking5548@gmail.com",
  },
  {
    id: "phone",
    label: "Call Me",
    value: "+91 9876543210",
    icon: Phone,
    href: "tel:+919876543210",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/rutron",
    icon: Linkedin,
    href: "https://linkedin.com/in/rutron",
  },
  {
    id: "twitter",
    label: "Twitter",
    value: "@rutron_dev",
    icon: Twitter,
    href: "https://twitter.com/rutron_dev",
  },
];

export default function HireMePage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden px-6 md:px-20 py-24 flex flex-col items-center justify-center text-center">
      {/* Animated Background Blobs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 20, 0],
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, -15, 0],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-6 select-none"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Hire Me
        <motion.span
          className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          .
        </motion.span>
      </motion.h1>

      <motion.p
        className="max-w-2xl text-muted-foreground mb-16 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        I am available for freelance projects, collaborations, and full-time opportunities.
        Let’s build something amazing together!
      </motion.p>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
        {contactMethods.map(({ id, label, value, icon: Icon, href }) => (
          <motion.a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background/80 border border-border rounded-xl p-6 flex flex-col items-center gap-3 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer select-none"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(124, 58, 237, 0.4)" }}
            transition={{ type: "spring", stiffness: 150 }}
            aria-label={`${label}: ${value}`}
          >
            <Icon className="w-10 h-10 text-primary" />
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-muted-foreground truncate max-w-[180px]">{value}</p>
          </motion.a>
        ))}
      </div>

      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-10 right-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-purple-600/30 hover:shadow-purple-700/40 transition-shadow"
          onClick={() => window.open("mailto:myonlineworking5548@gmail.com")}
        >
          Contact Now
        </Button>
      </motion.div>
    </main>
  );
}
