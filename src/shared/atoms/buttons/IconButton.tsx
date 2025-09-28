import React from "react";
import Button from "./Button";

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
  size,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      icon={icon}
      iconSize={iconSize}
      width={size || iconSize}
      height={size || iconSize}
      borderRadius="40%"
    />
  );
};

export default IconButton;
