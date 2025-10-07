export interface FlexConfig {
  flexDirection: React.CSSProperties["flexDirection"];
  orderLabel: number;
  orderButton: number;
}

export function getFlexConfig(
  labelPosition: "left" | "right" | "top" | "bottom",
): FlexConfig {
  switch (labelPosition) {
    case "left":
      return { flexDirection: "row", orderLabel: 0, orderButton: 1 };
    case "right":
      return { flexDirection: "row", orderLabel: 1, orderButton: 0 };
    case "top":
      return { flexDirection: "column", orderLabel: 0, orderButton: 1 };
    case "bottom":
      return { flexDirection: "column", orderLabel: 1, orderButton: 0 };
    default:
      return { flexDirection: "row", orderLabel: 0, orderButton: 1 };
  }
}
