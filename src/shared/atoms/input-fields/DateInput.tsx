import React from 'react';
import { InputField } from './InputField';
import { InputFieldProps } from './InputField';

type DateInputProps = Omit<InputFieldProps, 'type'>;

export const DateInput: React.FC<DateInputProps> = (props) => {
  return <InputField type="date" {...props} />;
};