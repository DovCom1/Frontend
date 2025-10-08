// useRootScale.ts
import { useEffect } from "react";

export function useRootScale(
  designWidth = 1920,
  designHeight = 1080,
  debounceMs = 80,
) {
  useEffect(() => {
    let t: number | null = null;
    const update = () => {
      const sw = window.innerWidth / designWidth;
      const sh = window.innerHeight / designHeight;

      document.documentElement.style.setProperty(
        "--scale-w",
        String(+sw.toFixed(4)),
      );
      document.documentElement.style.setProperty(
        "--scale-h",
        String(+sh.toFixed(4)),
      );
    };
    update();
    const onResize = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(update, debounceMs);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (t) window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [designWidth, designHeight, debounceMs]);
}
