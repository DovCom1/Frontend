import React from "react";

interface IconProps {
  path: string;
  size?: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  path,
  size = "18px",
  width,
  height,
  className = "",
  style,
  onClick,
}) => {
  const iconStyle: React.CSSProperties = {
    width: width || size,
    height: height || size,
    fontSize: size,
    ...style,
  };

  if (path.startsWith("http") || path.includes(".")) {
    return (
      <img
        src={path}
        alt=""
        className={`icon ${className}`}
        style={iconStyle}
      />
    );
  } else {
    return (
      <div className={`icon ${className}`} style={iconStyle} onClick={onClick}>
        {path}
      </div>
    );
  }
};

export default Icon;
