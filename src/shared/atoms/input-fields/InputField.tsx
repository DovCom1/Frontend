import React, { useState, useRef } from 'react';
import classes from './InputField.module.css';

export interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'datetime-local';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;

  min?: string;
  max?: string;
  step?: string;
  pattern?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  min,
  max,
  step,
  pattern,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = Boolean(value);
  const shouldFloat = isFocused || hasValue;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleLabelClick = () => {
    inputRef.current?.focus();
  };

  const inputClasses = [
    classes.input,
    error ? classes.inputError : '',
    disabled ? classes.inputDisabled : '',
  ].join(' ');

  const labelClasses = [
    classes.label,
    shouldFloat ? classes.labelFloating : '',
    error ? classes.labelError : '',
  ].join(' ');

  return (
    <div className={`${classes.inputField} ${className}`}>
      <div className={classes.inputContainer}>
        <input
          ref={inputRef}
          type={type}
          placeholder={shouldFloat ? placeholder : ''}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className={inputClasses}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
        />
        
        {label && (
          <label 
            className={labelClasses}
            onClick={handleLabelClick}
          >
            {label}
            {required && <span className={classes.required}>*</span>}
          </label>
        )}
      </div>
      
      {error && (
        <p className={classes.error}>{error}</p>
      )}
    </div>
  );
};
