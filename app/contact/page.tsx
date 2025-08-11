"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-bold tracking-tight"
        >
          Let’s Talk! 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-muted-foreground"
        >
          Have questions, ideas, or just want to say hi?  
          Fill the form below or drop an email at{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:myonlineworking5548@gmail.com"
            className="underline underline-offset-4 hover:text-primary transition"
          >
            myonlineworking5548@gmail.com
          </motion.a>
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-card rounded-2xl p-8 shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Input placeholder="Your Name" className="h-12" />
            </motion.div>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Input type="email" placeholder="Your Email" className="h-12" />
            </motion.div>
          </div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <Textarea placeholder="Your Message" className="h-32 resize-none" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">Send Message ✉️</span>
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
