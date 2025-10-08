import React from "react";
import { scaleSize } from "../../utils/setScaling";

export interface LabelProps {
  text: string;
  className?: string;
  fontSize?: string | number;
  width?: string | number;
  height?: string | number;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  color?: string;
  verticalAlign?: "top" | "center" | "bottom";
  fontFamily?: string;
  scale?: boolean; // if true save design's proportions on user screen
}

const Label: React.FC<LabelProps> = ({
  text,
  fontSize,
  width,
  height,
  textAlign,
  color,
  fontFamily,
  verticalAlign,
  className = "",
  scale,
}) => {
  if (scale) {
    fontSize = scaleSize(fontSize, "x");
    width = scaleSize(width, "x");
  }

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre-wrap", // сохраняет переводы строк \n и переносит длинные строки
    width: width,
    height: height,
    color: color,
    fontFamily: fontFamily,
    fontSize: fontSize,
    textAlign: textAlign,
    verticalAlign: verticalAlign,
  };
  return (
    <div className={className} style={labelStyle}>
      {text}
    </div>
  );
};

export default Label;
