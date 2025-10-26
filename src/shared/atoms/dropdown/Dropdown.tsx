import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Dropdown.module.css";

export interface DropdownOption<T = any> {
  value: T;
  content: React.ReactNode;
  key?: string;
}

interface DropdownProps<T = any> {
  options: DropdownOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: React.ReactNode;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Dropdown = <T,>({
  options,
  value,
  onChange,
  placeholder = "Выберите вариант",
  label,
  error,
  required = false,
  disabled = false,
  className = "",
}: DropdownProps<T>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = (event: Event) => {
      const isScrollInsideDropdown = dropdownListRef.current?.contains(
        event.target as Node
      );

      if (!isScrollInsideDropdown) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: T) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const dropdownClasses = [
    classes.dropdown,
    isOpen ? classes.dropdownOpen : "",
    error ? classes.dropdownError : "",
    disabled ? classes.dropdownDisabled : "",
    className,
  ].join(" ");

  const renderDropdownList = () => {
    if (!isOpen || !dropdownRef.current) return null;

    const rect = dropdownRef.current.getBoundingClientRect();

    const dropdownStyle: React.CSSProperties = {
      position: "fixed",
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      zIndex: 9999,
    };

    return ReactDOM.createPortal(
      <div
        className={classes.dropdownList}
        style={dropdownStyle}
        ref={dropdownListRef}
      >
        {options.map((option, index) => (
          <div
            key={option.key || index}
            className={`${classes.dropdownItem} ${
              option.value === value ? classes.dropdownItemSelected : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              console.log("проверка нажатия");
              handleSelect(option.value);
            }}
          >
            {option.content}
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className={classes.dropdownWrapper}>
        {label && (
          <label className={classes.label}>
            {label}
            {required && <span className={classes.required}>*</span>}
          </label>
        )}

        <div className={dropdownClasses} ref={dropdownRef}>
          <div className={classes.dropdownHeader} onClick={handleToggle}>
            <div className={classes.selectedValue}>
              {selectedOption ? (
                selectedOption.content
              ) : (
                <span className={classes.placeholder}>{placeholder}</span>
              )}
            </div>

            <div className={classes.dropdownArrow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#F6F6F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {error && <p className={classes.error}>{error}</p>}
      </div>

      {renderDropdownList()}
    </>
  );
};
