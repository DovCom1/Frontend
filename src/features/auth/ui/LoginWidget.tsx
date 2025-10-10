import React, { useState, useEffect } from "react";
import buttonClasses from "../../../shared/atoms/buttons/Button.module.css";
import { Modal } from "../../../shared/atoms/modal/Modal";
import { EmailInput } from "../../../shared/atoms/input-fields/EmailInput";
import { PasswordInput } from "../../../shared/atoms/input-fields/PasswordInput";
import Button from "../../../shared/atoms/buttons/Button";
import Label from "../../../shared/atoms/labels/Label";
import Icon from "../../../shared/atoms/icons/Icon";
import { useAuthStore } from "../model/AuthStore";
import { useAuthWidgetStore } from "../model/AuthWidgetStore";
import { validatePasswordDetailed } from "../model/Validation";
import LabeledIconButton from "../../../shared/atoms/buttons/LabeledIconButton";

export const LoginWidget: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, isLoading, clearError } = useAuthStore();
  const { isLoginOpen, closeAll, switchToRegister } = useAuthWidgetStore();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (isLoginOpen) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      clearError();
    }
  }, [isLoginOpen, clearError]);


  const isFormValid = () => {
    const isEmailValid = email.trim() !== "" && emailRegex.test(email);
    
    const isPasswordValid = password.trim() !== "" && validatePasswordDetailed(password);
    
    return isEmailValid && isPasswordValid;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    
    if (value.trim() === "") {
      setEmailError("");
    } else if (!emailRegex.test(value)) {
      setEmailError("Неверный формат email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    
    if (value.trim() === "") {
      setPasswordError("Пароль обязателен для заполнения");
    } else if (!validatePasswordDetailed(value)) {
      setPasswordError("Пароль должен быть сложнее");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      await login({ email, password });
      closeAll();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const isButtonDisabled = isLoading || !isFormValid();

  return (
    <Modal isOpen={isLoginOpen} onClose={closeAll}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LabeledIconButton
          label={<Label text={"DovCom"} color={"#fff"} fontSize={"20px"} />}
          icon={<Icon path={"/icons/logo.svg"} size={"55px"} />}
          labelPosition={"bottom"}
          gap={"0px"}
        />

        <Label
          text={"Авторизация"}
          fontSize={"30px"}
          color={"#fff"}
          textAlign="center"
        />

        <div style={{ width: "90%", marginBottom: "16px" }}>
          <EmailInput
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            required
          />
        </div>

        <div style={{ width: "90%", marginBottom: "24px" }}>
          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            required
          />
        </div>

        <div style={{ width: "90%" }}>
          <Button
            className={buttonClasses.defaultButtonOrange}
            label={<Label text={isLoading ? "Вход..." : "Войти"} />}
            disabled={isButtonDisabled}
            width="100%"
            borderRadius="18px"
            icon={isLoading ? <Icon path="/icons/loading.svg" /> : undefined}
          />
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#F6F6F6",
            marginTop: "16px",
          }}
        >
          Ещё нет аккаунта?{" "}
          <span style={{ display: "inline-block", marginLeft: "4px" }}>
            <Button
              label={<Label text={"Зарегистрироваться"} color={"#3b82f6"} />}
              onClick={switchToRegister}
            />
          </span>
        </div>
      </form>
    </Modal>
  );
};