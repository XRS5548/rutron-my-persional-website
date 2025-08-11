"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react"; // ya koi icon library jo use karte ho
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ_DATA = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in Next.js, React, Tailwind CSS, Flutter, AI & Machine Learning, Python, Unity game development, and more.",
  },
  {
    question: "How can I contact you for a project?",
    answer:
      "You can use the Contact page on this website or email me directly at myonlineworking5548@gmail.com.",
  },
  {
    question: "Do you offer freelance or full-time work?",
    answer:
      "Yes, I am open to both freelance projects and full-time opportunities depending on the role and fit.",
  },
  {
    question: "Can you help with UI/UX design?",
    answer:
      "Absolutely! I have a strong passion for clean, accessible, and user-friendly UI/UX design.",
  },
  {
    question: "Where can I see your previous projects?",
    answer:
      "Check out the Projects page for detailed case studies, demos, and repositories of my work.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleIndex(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <main className="min-h-screen bg-background px-6 md:px-20 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-8 text-center select-none">
          Frequently Asked Questions
        </h1>
        <p className="mb-12 text-center text-muted-foreground">
          Got questions? Here are some common ones. Click a question to reveal the answer.
        </p>

        <div className="space-y-6">
          {FAQ_DATA.map(({ question, answer }, i) => {
            const isOpen = openIndex === i;
            return (
              <Card
                key={i}
                onClick={() => toggleIndex(i)}
                className="cursor-pointer border border-border hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex justify-between items-center px-6 py-4 select-none">
                  <CardTitle className="text-lg">{question}</CardTitle>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </motion.div>
                </CardHeader>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginTop: 8 },
                        collapsed: { opacity: 0, height: 0, marginTop: 0 },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <CardContent className="px-6 pb-6 pt-0 text-muted-foreground">
                        {answer}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
