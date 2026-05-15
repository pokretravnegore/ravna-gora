"use client";

import { useRef, useEffect, useState } from "react";

export function SectionHeading({ title, light }: { title: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <p className={`type-h1 ${light ? "text-white" : "text-black"}`}>{title}</p>
      <div
        ref={ref}
        className={`h-0.5 ${light ? "bg-white" : "bg-blue-2"} transition-[width] duration-700 ease-out`}
        style={{ width: visible ? "70px" : "0px" }}
      />
    </div>
  );
}
