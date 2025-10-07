import React, { useState, useEffect } from "react";
import { useAuthStore } from "../model/AuthStore";
import { useAuthWidgetStore } from "../model/AuthWidgetStore";
import { Modal } from "../../../shared/atoms/modal/Modal";
import Button from "../../../shared/atoms/buttons/Button";
import Label from "../../../shared/atoms/labels/Label";
import Icon from "../../../shared/atoms/icons/Icon";
import { TextInput } from "../../../shared/atoms/input-fields/TextInput";
import { EmailInput } from "../../../shared/atoms/input-fields/EmailInput";
import { PasswordInput } from "../../../shared/atoms/input-fields/PasswordInput";
import { DateInput } from "../../../shared/atoms/input-fields/DateInput";
import buttonClasses from "../../../shared/atoms/buttons/Button.module.css";
import LabeledIconButton from "../../../shared/atoms/buttons/LabeledIconButton";

export const RegisterWidget: React.FC = () => {
  const [formData, setFormData] = useState({
    uid: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
  });

  const { register, isLoading, error, clearError } = useAuthStore();
  const { isRegisterOpen, closeAll, switchToLogin } = useAuthWidgetStore();

  useEffect(() => {
    if (isRegisterOpen) {
      setFormData({
        uid: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        gender: "",
      });
      clearError();
    }
  }, [isRegisterOpen, clearError]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        uid: formData.uid,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        birthDate: formData.birthDate,
        gender: formData.gender as "мужщина" | "женщина",
      });
      closeAll();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const getMaxBirthDate = (): string => {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );
    return minDate.toISOString().split("T")[0];
  };

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeAll}>
      <form
        onSubmit={handleSubmit}
        style={{ maxHeight: "90vh", overflowY: "auto", paddingRight : 20, paddingLeft : 20}}
      >
        {/* Общая ошибка формы
        {error && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px",
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <div style={{ fontWeight: "600" }}>Ошибка регистрации</div>
            <div style={{ marginTop: "4px" }}>{error}</div>
          </div>
        )} */}


        <div style={{ display: "flex", marginBottom: "10px", flexDirection: "column", gap: "10px", alignItems: "center"}}>
          <LabeledIconButton
          label={<Label text={"DovCom"} color={"#fff"} fontSize={"20px"} />}
          icon={<Icon path={"/icons/logo.svg"} size={"55px"} />}
          labelPosition={"bottom"}
          gap={"0px"}
          />

          <Label
          text={"Регистрация"}
          fontSize={"30px"}
          color={"#fff"}
          />

          {/* Никнейм */}
          <TextInput
            label="Никнейм *"
            placeholder="your_nickname"
            value={formData.username}
            onChange={(value) => handleChange("username", value)}
            required
          />

          {/* Uid */}
          <TextInput
            label="UID из 10 Символов"
            placeholder="Ваше настоящее имя"
            value={formData.uid}
            onChange={(value) => handleChange("name", value)}
            required
          />

          {/* Email */}
          <EmailInput
            label="Email *"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            required
          />

          {/* Пароль */}
          <PasswordInput
            label="Пароль *"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            required
          />

          {/* Подтверждение пароля */}
          <PasswordInput
            label="Подтверждение пароля *"
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
            onChange={(value) => handleChange("confirmPassword", value)}
            required
          />

          {/* Дата рождения */}
          <DateInput
            label="Дата рождения *"
            value={formData.birthDate}
            onChange={(value) => handleChange("birthDate", value)}
            max={getMaxBirthDate()}
            required
          />
        </div>

        {/* Кнопка регистрации */}
        <div style={{ width: "100%" }}>
          <Button
            className={buttonClasses.defaultButtonOrange}
            label={
              <Label
                text={isLoading ? "Регистрация..." : "Зарегистрироваться"}
              />
            }
            width="100%"
            disabled={isLoading}
            icon={isLoading ? <Icon path="/icons/loading.svg" /> : undefined}
          />
        </div>

        {/* Ссылка на вход */}
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Уже есть аккаунт?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            style={{
              background: "none",
              color: "#3b82f6",
              fontWeight: "600",
            }}
          >
            Войти
          </button>
        </div>
      </form>
    </Modal>
  );
};
