"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* 🌈 Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[200px] top-[-100px] left-[20%]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[200px] bottom-[-100px] right-[20%]"
        />
      </div>

      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold">Runo</h1>

        <a
          href="https://github.com/PushkargithubCSE/runo.git"
          target="_blank"
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <Github size={18} />
          GitHub
        </a>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center text-center mt-24 px-6">

        <FadeIn>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Run any project <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-[length:200%] animate-[gradient_6s_linear_infinite] text-transparent bg-clip-text">
              instantly
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-gray-400 mt-6 text-lg max-w-xl">
            Stop reading setup instructions. Clone and run any project with one command.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-12 w-full max-w-xl">
            <TypingTerminal />
          </div>
        </FadeIn>

      </section>

      {/* FEATURES */}
      <section className="mt-40 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {[
          { title: "Zero setup", desc: "No configs or installs" },
          { title: "Auto detection", desc: "Detects project type" },
          { title: "Instant run", desc: "One command to run" },
        ].map((f, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900/60 backdrop-blur border border-zinc-800 p-6 rounded-2xl hover:border-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{f.desc}</p>
            </motion.div>
          </FadeIn>
        ))}

      </section>

      {/* HOW IT WORKS */}
      <FadeIn>
        <section className="mt-40 max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-semibold mb-10">
            From clone to running in seconds
          </h2>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 text-left">
            <pre className="text-green-400 text-sm">
{`git clone repo
cd repo
agent run

⚡ Setup complete`}
            </pre>
          </div>

        </section>
      </FadeIn>

      {/* COPY TERMINAL */}
      <FadeIn>
        <section className="mt-40 text-center px-6">

          <h2 className="text-4xl font-semibold mb-6">
            Clone. Run. Done.
          </h2>

          <div className="max-w-xl mx-auto">
            <CopyTerminal />
          </div>

        </section>
      </FadeIn>

      {/* FOOTER */}
      <footer className="mt-40 border-t border-zinc-800 py-10 text-center text-gray-500 text-sm">
        <p>Built with ❤️ by Pushkar</p>

        <a
          href="hhttps://github.com/PushkargithubCSE/runo.git"
          target="_blank"
          className="inline-block mt-2 hover:text-white"
        >
          View on GitHub
        </a>
      </footer>

    </main>
  );
}

/* =========================
   ✨ Fade In Component
========================= */
function FadeIn({ children, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

/* =========================
   💻 Terminal Component
========================= */
function TypingTerminal() {
  const steps = [
    { type: "command", text: "pip install runo-agent" },
    { type: "command", text: "agent run" },
    { type: "space" },
    { type: "output", text: "🐍 Detected Python project" },
    { type: "loading", text: "📦 Installing dependencies..." },
    { type: "output", text: "▶ Running..." },
  ];

  const [lines, setLines] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepIndex >= steps.length) {
      setTimeout(() => {
        setLines([]);
        setStepIndex(0);
        setCharIndex(0);
      }, 2000);
      return;
    }

    const step = steps[stepIndex];

    if (step.type === "space") {
      setLines((prev) => [...prev, ""]);
      setStepIndex(stepIndex + 1);
      return;
    }

    const delay =
      step.type === "command" ? 60 :
      step.type === "output" ? 30 :
      80;

    const timeout = setTimeout(() => {
      if (charIndex < step.text.length) {
        setLines((prev) => {
          const updated = [...prev];
          updated[stepIndex] =
            (updated[stepIndex] || "") + step.text[charIndex];
          return updated;
        });
        setCharIndex(charIndex + 1);
      } else {
        if (step.type === "loading") {
          setLines((prev) => {
            const updated = [...prev];
            updated[stepIndex] += " ...done";
            return updated;
          });
        }
        setStepIndex(stepIndex + 1);
        setCharIndex(0);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, stepIndex]);

  /* Auto scroll */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div 
      style={{ height: "280px", width: "100%", flexShrink: 0 }}
      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 overflow-hidden"
    >
      <div ref={containerRef} style={{ height: "100%", overflow: "hidden" }}>
  
        {/* dots */}
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
  
        <pre className="text-green-400 text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div key={i}>
              {line}
              {i === stepIndex && <Cursor />}
            </div>
          ))}
        </pre>
  
      </div>
    </div>
  );
}

/* Cursor */
function Cursor() {
  return (
    <span className="inline-block w-[8px] h-[16px] bg-green-400 ml-1 animate-[blink_1s_steps(2,start)_infinite]" />
  );
}

/* =========================
   📋 Copy Terminal
========================= */
function CopyTerminal() {
  const command = `pip install runo-agent
agent run`;

  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }}
      className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6"
    >

<button
  onClick={copy}
  className="absolute top-4 right-4 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
>
  {copied ? (
    <Check size={16} className="text-green-400" />
  ) : (
    <Copy size={16} className="text-gray-400" />
  )}
</button>

      <pre className="text-green-400 text-sm whitespace-pre-wrap">
{command}
      </pre>

    </motion.div>
  );
}