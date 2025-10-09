interface PasswordValidation {
  isValid: boolean;
  hasUpperCase: boolean;
  hasNumbers: boolean;
  hasLowerCase: boolean;
  minLength: boolean;
}

export function validatePasswordDetailed(password: string): boolean {
  const validation: PasswordValidation = {
    isValid: false,
    hasUpperCase: /[A-Z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    minLength: password.length >= 6,
  };

  validation.isValid =
    validation.hasUpperCase &&
    validation.hasNumbers &&
    validation.hasLowerCase &&
    validation.minLength;
  return validation.isValid;
}
