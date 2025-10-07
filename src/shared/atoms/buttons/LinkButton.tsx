import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface LinkProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  url: string;
}

// Обертка над базовой кнопкой, с определенным методом onCLick, перенапраляющем на url, который задается в props
const LinkButton: React.FC<LinkProps> = ({ url, ...buttonProps }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };
  return <Button {...buttonProps} onClick={handleClick} />;
};

export default LinkButton;
