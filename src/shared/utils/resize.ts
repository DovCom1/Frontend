import { useCallback, useEffect, useState } from "react";

type Opts = { min?: number; max?: number };

/**
 * Хук масштабирования по дизайну для ширины и высоты.
 * designWidth / designHeight — размер макета (например 1920x1080).
 */
export function useDesignScale(
  designWidth = 1440,
  designHeight = 1024,
  debounceMs = 80,
) {
  const isClient = typeof window !== "undefined";

  const [viewport, setViewport] = useState(() => ({
    w: isClient ? window.innerWidth : designWidth,
    h: isClient ? window.innerHeight : designHeight,
  }));

  useEffect(() => {
    if (!isClient) return;

    let t: number | null = null;
    const onResize = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        setViewport({ w: window.innerWidth, h: window.innerHeight });
      }, debounceMs);
    };

    // Установим точное значение сразу (на случай, если initial был design... в SSR)
    setViewport({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener("resize", onResize);
    return () => {
      if (t) window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [isClient, debounceMs]);

  const scaleWidth = viewport.w / designWidth;
  const scaleHeight = viewport.h / designHeight;

  const toPxWidth = useCallback(
    (designPx: number, opts?: Opts) => {
      const scaled = Math.round((designPx * viewport.w) / designWidth);
      if (opts?.min != null && scaled < opts.min) return `${opts.min}px`;
      if (opts?.max != null && scaled > opts.max) return `${opts.max}px`;
      return `${scaled}px`;
    },
    [viewport.w, designWidth],
  );

  const toPxHeight = useCallback(
    (designPx: number, opts?: Opts) => {
      const scaled = Math.round((designPx * viewport.h) / designHeight);
      if (opts?.min != null && scaled < opts.min) return `${opts.min}px`;
      if (opts?.max != null && scaled > opts.max) return `${opts.max}px`;
      return `${scaled}px`;
    },
    [viewport.h, designHeight],
  );

  // Дополнительно — числовые значения без суффикса (если нужно для расчётов)
  const toPxWidthNum = useCallback(
    (designPx: number) => Math.round((designPx * viewport.w) / designWidth),
    [viewport.w, designWidth],
  );
  const toPxHeightNum = useCallback(
    (designPx: number) => Math.round((designPx * viewport.h) / designHeight),
    [viewport.h, designHeight],
  );

  return {
    toPxWidth,
    toPxHeight,
    toPxWidthNum,
    toPxHeightNum,
    scaleWidth,
    scaleHeight,
    viewport, // {w,h} — на случай, если понадобится
  };
}
