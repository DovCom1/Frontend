import React from "react";
import renderIcon from "../utils/renderIcon";
import classes from "./Button.module.css";

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
  width,
  height,
  borderRadius = "6px",
  backgroundColor,
  textColor,
  disabled = false,
  onClick,
  className = "",
}) => {

  const buttonStyle: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    color: textColor,
  };

  const iconStyle: React.CSSProperties = {
    width: iconSize,
    height: iconSize,
    fontSize: iconSize,
  };


  return (
    <button
      type="button"
      className={`${classes.customButton} ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && renderIcon(icon, iconStyle)}
      {label && <div className="button-label">{label}</div>}
      {icon && iconPosition === "right" && renderIcon(icon, iconStyle)}
    </button>
  );
};

export default Button;
