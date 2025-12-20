export const scrollMessages = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  forceScroll: boolean = false,
) => {
  const el = containerRef.current;
  if (!el) return;

  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  const NEAR_BOTTOM_THRESHOLD = 100;

  // Если forceScroll = true или пользователь близко к низу
  if (forceScroll || distanceFromBottom <= NEAR_BOTTOM_THRESHOLD) {
    el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
  }
};
