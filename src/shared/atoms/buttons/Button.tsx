import React from "react";
import classes from "./Button.module.css";
import { getFlexConfig } from "../../utils/setlabelPosition";
import Label from "../labels/Label";
import Icon from "../icons/Icon";

interface ButtonProps {
  label?: React.ReactElement<typeof Label>;
  icon?: React.ReactElement<typeof Icon>;
  labelPosition?: "left" | "right" | "top" | "bottom"; // Положение текста относительно иконки

  width?: string;
  height?: string;
  borderRadius?: string;

  backgroundColor?: string;

  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  gap?: string;
}

// Базовый класс кнопки
const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  labelPosition = "left",
  width,
  height,
  borderRadius = "6px",
  backgroundColor,
  disabled = false,
  onClick,
  className = "",
  gap = "10px",
}) => {
  const { flexDirection, orderLabel, orderButton } =
    getFlexConfig(labelPosition);

  const buttonStyle: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    display: "flex",
    flexDirection: flexDirection,
    alignItems: "center",
    gap: gap,
  };

  return (
    <button
      type="button"
      className={`${classes.customButton} ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <div style={{ order: orderButton }}>{icon}</div>}
      {<div style={{ order: orderLabel }}>{label}</div>}
    </button>
  );
};

export default Button;
