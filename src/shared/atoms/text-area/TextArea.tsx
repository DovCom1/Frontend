import React, { useEffect, useRef } from "react";
import classes from "./TextArea.module.css";
import { LabelProps } from "../labels/Label";

export interface TextAreaProps {
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEnterPress?: () => void;

  // maxHeight?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  className,
  value,
  onChange,
  onEnterPress,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Автоматическая подстройка высоты
  const resizeInput = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto"; // сбрасываем
    el.style.height = `${el.scrollHeight}px`; // выставляем под контент
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // блокируем перенос строки
      onEnterPress?.(); // вызываем колбэк отправки
    }
  };

  useEffect(() => {
    resizeInput(); // корректируем после первого рендера
  }, [value]);
  return (
    <textarea
      ref={ref}
      className={`${classes.defaultWrapper} ${className}`}
      placeholder={placeholder}
      value={value}
      onInput={onChange}
      onKeyDown={handleKeyDown}
    ></textarea>
  );
};

export default TextArea;
