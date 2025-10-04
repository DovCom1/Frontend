import React from 'react';
import { InputField } from './InputField';
import { InputFieldProps } from './InputField';

type PasswordInputProps = Omit<InputFieldProps, 'type'>;

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  return <InputField type="password" {...props} />;
};