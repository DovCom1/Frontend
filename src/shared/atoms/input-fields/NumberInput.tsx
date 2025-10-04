import React from 'react';
import { InputField } from './InputField';
import { InputFieldProps } from './InputField';

type NumberInputProps = Omit<InputFieldProps, 'type' | 'min' | 'max' | 'step'> & {
  min?: number;
  max?: number;
  step?: number;
};

export const NumberInput: React.FC<NumberInputProps> = ({ 
  min, 
  max, 
  step, 
  ...props 
}) => {
  return (
    <InputField 
      type="number" 
      min={min?.toString()}
      max={max?.toString()}
      step={step?.toString()}
      {...props} 
    />
  );
};
