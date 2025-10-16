import React, { useEffect, useRef } from "react";
import classes from "./TextArea.module.css";
import { LabelProps } from "../labels/Label";

export interface TextAreaProps {
  placeholder?: string;
  value?: string;
  className?: string;
  // maxHeight?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  className,
  value,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Автоматическая подстройка высоты
  const handleInput = (e?: React.FormEvent<HTMLTextAreaElement>) => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto"; // сбрасываем
    el.style.height = `${el.scrollHeight}px`; // выставляем под контент
  };

  useEffect(() => {
    handleInput(); // корректируем после первого рендера
  }, [value]);
  return (
    <textarea
      ref={ref}
      className={`${classes.defaultWrapper} ${className}`}
      placeholder={placeholder}
      value={value}
      onInput={handleInput}
    ></textarea>
  );
};

export default TextArea;
