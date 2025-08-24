"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

type Props = { html: string };

export default function BlogContent({ html }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Syntax highlight
    ref.current.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });

    // Copy button (top-right)
    ref.current.querySelectorAll("pre").forEach((pre) => {
      const host = pre as HTMLElement;

      // avoid duplicate button on re-render
      if (host.querySelector("[data-copy-btn]")) return;

      host.classList.add("relative");

      const btn = document.createElement("button");
      btn.textContent = "Copy";
      btn.setAttribute("data-copy-btn", "true");
      btn.className =
        "absolute right-3 top-3 text-xs px-2 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur border border-white/10";

      btn.addEventListener("click", () => {
        const code = host.querySelector("code")?.textContent ?? "";
        navigator.clipboard.writeText(code);
        const old = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = old || "Copy"), 1200);
      });

      host.appendChild(btn);
    });
  }, [html]);

  return (
    <article
      ref={ref}
      className="
        prose prose-invert max-w-none
        prose-pre:bg-zinc-900 prose-pre:rounded-xl prose-pre:p-4 prose-pre:shadow
        prose-code:before:hidden prose-code:after:hidden
        prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-code:bg-zinc-800/60
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
