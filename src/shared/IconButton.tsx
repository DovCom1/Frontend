import React from "react";
import Button from "./Button/Button";

interface IconButtonProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "label" | "width" | "height" | "borderRadius" | "iconPosition"
  > {
  icon: string;
  size?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconSize = "40px",
  size = "70px",
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      icon={icon}
      iconSize={iconSize}
      width={size}
      height={size}
      borderRadius="40%"
    />
  );
};

export default IconButton;
