import React from "react";

export interface LabelProps {
  text: string;
  className?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  color?: string;
  verticalAlign?: "top" | "center" | "bottom";
  fontFamily?: string;
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
}) => {
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
