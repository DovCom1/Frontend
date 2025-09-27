import React from "react";
import "./Button.css";

interface ButtonProps {
  label?: string;
  icon?: string;
  iconPosition?: "left" | "right"; // Положение иконки относительно текста
  iconSize?: string;

  width?: string;
  height?: string;
  borderRadius?: string;

  color?: string;
  backgroundColor?: string;
  textColor?: string;

  disabled?: boolean;
  onClick?: () => void;

  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  iconSize = "18px",
  iconPosition = "left",
  width = "auto",
  height = "auto",
  borderRadius = "6px",
  color,
  backgroundColor = "#2A3FA7",
  textColor = "#ffffff",
  disabled = false,
  onClick,
  className = "",
}) => {
  const finalBackgroundColor = color || backgroundColor;
  const finalTextColor = color ? "#fff" : textColor;

  const buttonStyle: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: finalBackgroundColor,
    color: finalTextColor,
  };

  const iconStyle: React.CSSProperties = {
    width: iconSize,
    height: iconSize,
    fontSize: iconSize,
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (
      typeof icon === "string" &&
      (icon.startsWith("http") || icon.includes("."))
    ) {
      return (
        <img src={icon} alt="" className="button-icon" style={iconStyle} />
      );
    } else if (typeof icon === "string") {
      return (
        <span className="button-icon" style={iconStyle}>
          {icon}
        </span>
      );
    } else {
      return (
        <span className="button-icon" style={iconStyle}>
          {icon}
        </span>
      );
    }
  };

  return (
    <button
      type="button"
      className={`custom-button ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && renderIcon()}
      {label && <span className="button-label">{label}</span>}
      {icon && iconPosition === "right" && renderIcon()}
    </button>
  );
};

export default Button;
