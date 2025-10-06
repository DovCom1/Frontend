import React, { useState, useRef, useEffect } from 'react';
import classes from './Dropdown.module.css';

// Максимально абстрактный тип - можно передать ЛЮБОЙ React элемент
export interface DropdownOption<T = any> {
  value: T;
  content: React.ReactNode; // ЛЮБОЙ React компонент или элемент
  key?: string; // Уникальный ключ для React
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
  placeholder = 'Выберите вариант',
  label,
  error,
  required = false,
  disabled = false,
  className = '',
}: DropdownProps<T>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    isOpen ? classes.dropdownOpen : '',
    error ? classes.dropdownError : '',
    disabled ? classes.dropdownDisabled : '',
    className,
  ].join(' ');

  return (
    <div className={classes.dropdownWrapper}>
      {label && (
        <label className={classes.label}>
          {label}
          {required && <span className={classes.required}>*</span>}
        </label>
      )}
      
      <div className={dropdownClasses} ref={dropdownRef}>
        <div 
          className={classes.dropdownHeader}
          onClick={handleToggle}
        >
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

        {isOpen && (
          <div className={classes.dropdownList}>
            {options.map((option, index) => (
              <div
                key={option.key || index}
                className={`${classes.dropdownItem} ${
                  option.value === value ? classes.dropdownItemSelected : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.content}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className={classes.error}>{error}</p>
      )}
    </div>
  );
};