import React from 'react';
import { InputField } from './InputField';
import { InputFieldProps } from './InputField';

type TextInputProps = Omit<InputFieldProps, 'type'>;

export const TextInput: React.FC<TextInputProps> = (props) => {
  return <InputField type="text" {...props} />;
};
