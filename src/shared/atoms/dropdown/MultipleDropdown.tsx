import React, { useState, useRef, useEffect } from 'react';
import classes from './MultipleDropdown.module.css';
import { DropdownOption } from './Dropdown';

interface MultipleDropdownProps<T = any> {
  options: DropdownOption<T>[];
  value?: T[];
  onChange?: (values: T[]) => void;
  placeholder?: React.ReactNode;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  renderSelected?: (selectedOptions: DropdownOption<T>[]) => React.ReactNode;
}

export const MultipleDropdown = <T,>({
  options,
  value = [],
  onChange,
  placeholder = 'Выберите варианты',
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  renderSelected,
}: MultipleDropdownProps<T>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter(option => value.includes(option.value));

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
    const newValues = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    
    onChange?.(newValues);
  };

  const dropdownClasses = [
    classes.dropdown,
    isOpen ? classes.dropdownOpen : '',
    error ? classes.dropdownError : '',
    disabled ? classes.dropdownDisabled : '',
    className,
  ].join(' ');

  const getDisplayContent = () => {
    if (renderSelected) {
      return renderSelected(selectedOptions);
    }
    
    if (selectedOptions.length === 0) {
      return <span className={classes.placeholder}>{placeholder}</span>;
    }
    if (selectedOptions.length === 1) {
      return selectedOptions[0].content;
    }
    return `Выбрано: ${selectedOptions.length}`;
  };

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
            {getDisplayContent()}
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
            {options.map((option, index) => {
              const isSelected = value.includes(option.value);
              
              return (
                <div
                  key={option.key || index}
                  className={`${classes.dropdownItem} ${
                    isSelected ? classes.dropdownItemSelected : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                
                  <div className={classes.optionContent}>
                    {option.content}
                  </div>
                  
                   <div className={classes.tickBox}>
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M20 6L9 17L4 12" 
                          stroke="#F6F6F6" 
                          strokeWidth="2" 
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <p className={classes.error}>{error}</p>
      )}
    </div>
  );
};