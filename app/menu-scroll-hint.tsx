"use client";

import { useEffect, useState } from "react";

export default function MenuScrollHint() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const menu = document.getElementById("side-nav");
    if (!menu) return;

    const updateHint = () => {
      setAtBottom(menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 2);
    };

    updateHint();
    menu.addEventListener("scroll", updateHint, { passive: true });
    window.addEventListener("resize", updateHint);
    return () => {
      menu.removeEventListener("scroll", updateHint);
      window.removeEventListener("resize", updateHint);
    };
  }, []);

  return (
    <div className="menu-scroll-hint" aria-live="polite">
      <span className="menu-scroll-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none"><path d={atBottom ? "m4 10 4-4 4 4" : "m4 6 4 4 4-4"} /></svg>
      </span>
      <span>{atBottom ? "Scroll up for more options" : "Scroll down for more options"}</span>
    </div>
  );
}
