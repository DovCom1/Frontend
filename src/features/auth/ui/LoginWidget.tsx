// features/auth/ui/login-widget.tsx
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
import LinkButton from "../../../shared/atoms/buttons/LinkButton";

export const LoginWidget: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error, fieldErrors, clearError } = useAuthStore();
  const { isLoginOpen, closeAll, switchToRegister } = useAuthWidgetStore();

  useEffect(() => {
    if (isLoginOpen) {
      setEmail("");
      setPassword("");
      clearError();
    }
  }, [isLoginOpen, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      closeAll();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={closeAll}>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Ошибка */}
        {error && !fieldErrors.email && !fieldErrors.password && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px",
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              fontSize: "14px",
              width: "100%",
            }}
          >
            <div style={{ fontWeight: "600" }}>Ошибка авторизации</div>
            <div style={{ marginTop: "4px" }}>{error}</div>
          </div>
        )}

        {/* Центрированный LinkButton */}
        <LinkButton
          label={<Label text={"DovCom"} color={"#fff"} fontSize={"30px"} />}
          icon={<Icon path={"/icons/logo.svg"} size={"80px"} />}
          url={"/"}
          labelPosition={"bottom"}
        />

        {/* Поля ввода - растягиваем на всю ширину */}
        <div style={{ width: "100%", marginBottom: "16px" }}>
          <EmailInput
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={setEmail}
            error={fieldErrors.email}
            required
          />
        </div>

        <div style={{ width: "100%", marginBottom: "24px" }}>
          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            required
          />
        </div>

        <div style={{ width: "100%" }}>
          <Button
            className={buttonClasses.defaultButtonOrange}
            label={<Label text={isLoading ? "Вход..." : "Войти"} />}
            disabled={isLoading}
            width="100%"
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
