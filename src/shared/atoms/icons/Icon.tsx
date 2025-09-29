import React from "react";

interface IconProps {
    path: string
    size?: string;
    className?: string;
    style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
    path,
    size = "18px",
    className = "",
    style}) => {

    const iconStyle: React.CSSProperties = {
        width: size,
        height: size,
        fontSize: size,
        ...style
    };

    if (path.startsWith("http") || path.includes(".")) {
        return <img src={path} alt="" className={`icon ${className}`} style={iconStyle}/>;
    } else {
        return <div className={`icon ${className}`} style={iconStyle}>{path}</div>;
    }
};

export default Icon;
