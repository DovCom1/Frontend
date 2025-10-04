import React from 'react';
import { InputField } from './InputField';
import { InputFieldProps } from './InputField';

type DateTimeInputProps = Omit<InputFieldProps, 'type'>;

export const DateTimeInput: React.FC<DateTimeInputProps> = (props) => {
  return <InputField type="datetime-local" {...props} />;
};