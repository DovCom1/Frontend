export const scrollMessages = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const el = containerRef.current;
  if (!el) return;

  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  const NEAR_BOTTOM_THRESHOLD = 100; // px — можно тонко настроить

  if (distanceFromBottom <= NEAR_BOTTOM_THRESHOLD) {
    // пользователь был близко к низу — прокручиваем
    el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
  }
};
