import React from "react";
import Button from "./Button";
import Icon from "../icons/Icon";

interface IconButtonProps
  extends Omit<
    React.ComponentProps<typeof Button>,
    "width" | "height" | "borderRadius" | "labelPosition" | "backgroundColor" | "label" | "gap"
  > {
  icon: React.ReactElement<typeof Icon>,
    size?: string;
}

// Кнопка в виде картинки (иконки), либо кнопка внутри которой картинка
// Если не указывать size, то иконка займет все место кнопки!
const IconButton: React.FC<IconButtonProps> = ({
   icon,
   size,
   ...buttonProps}) => {
  return (
    <Button
      {...buttonProps}
      icon={icon}
      width={size}
      height={size}
    />
  );
};

export default IconButton;
