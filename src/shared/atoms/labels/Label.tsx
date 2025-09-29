import React from "react";

export interface LabelProps {
    text: string;
    className?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
    color?: string;
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
    className = ""
}) => {
    const buttonStyle: React.CSSProperties = {
        width: width,
        height: height,
        color: color,
        fontFamily: fontFamily,
        fontSize: fontSize,
        textAlign: textAlign
    };
    return <div className={className} style={buttonStyle}>{text}</div>;
};

export default Label;


