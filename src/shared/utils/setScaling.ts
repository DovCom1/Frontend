// useRootScale.ts
import { useEffect } from "react";

export function useRootScale(initWidth = 1920, debounceMs = 80) {
  useEffect(() => {
    let timeout: number | null = null;
    const update = () => {
      const rel = (window.innerWidth - initWidth) / initWidth; // нормализованная разница
      let factor: number;

      if (rel >= 0) {
        // при увеличении — линейно
        factor = 1 + rel;
      } else {
        // при уменьшении — логарифмически *замедляющееся* уменьшение
        // формула: factor = 1 / (1 + logK * ln(1 + |t|))
        // при небольшом уменьшении |t| невелико -> factor близок к 1,
        // при сильном уменьшении ln растёт медленно -> factor падает, но замедляется.
        factor = 1 / (1 + Math.log(1 + -rel));
      }

      document.documentElement.style.setProperty(`--scale-x`, String(factor));
    };
    update();
    const onResize = () => {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(update, debounceMs);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (timeout) window.clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [initWidth, debounceMs]);
}

export function scaleSize(
  value: string | number | undefined,
  axis: "x" | "y",
  number: boolean = false, // оставил параметр, чтобы API совпадал
): string | undefined {
  if (typeof value === "number") {
    return `calc(${value}px * var(--scale-${axis}))`;
  }
  if (typeof value === "string") {
    const pxMatch = value.match(/^(\d+(\.\d+)?)px$/i);
    if (pxMatch) {
      const num = pxMatch[1];
      return `calc(${num}px * var(--scale-${axis}))`;
    }
  }
  return value;
}
