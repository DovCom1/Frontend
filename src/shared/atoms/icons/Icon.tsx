import React from "react";
import { scaleSize } from "../../utils/setScaling";

interface IconProps {
  path: string;
  size?: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  scale?: boolean;
}

const Icon: React.FC<IconProps> = ({
  path,
  size,
  width,
  height,
  className = "",
  style,
  onClick,
  scale,
}) => {
  if (scale) {
    width = scaleSize(width, "x");
    size = scaleSize(size, "x");
  }

  const iconStyle: React.CSSProperties = {
    width: width || size,
    height: height || size,
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
