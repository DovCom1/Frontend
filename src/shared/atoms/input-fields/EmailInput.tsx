import React from 'react';
import { InputField } from './InputField';
import { InputFieldProps } from './InputField';

type EmailInputProps = Omit<InputFieldProps, 'type'>;

export const EmailInput: React.FC<EmailInputProps> = (props) => {
  return <InputField type="email" {...props} />;
};
