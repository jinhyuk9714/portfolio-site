"use client";

import { achievements } from "@/data/skills";
import { useEffect, useState } from "react";

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("achievements");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 px-6 py-16 sm:py-24" id="achievements">
      <div className="relative mx-auto max-w-6xl">
        {/* Achievements Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-surface-border)",
          }}
        >
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className={`text-center p-4 sm:p-6 rounded-xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Number */}
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2"
                style={{ color: "var(--color-accent)" }}
              >
                {achievement.number}
              </div>

              {/* Label */}
              <div
                className="text-sm sm:text-base font-semibold mb-1"
                style={{ color: "var(--color-ink-primary)" }}
              >
                {achievement.label}
              </div>

              {/* Description */}
              <div
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--color-ink-tertiary)" }}
              >
                {achievement.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
