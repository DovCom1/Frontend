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
import { Dropdown } from "../../../shared/atoms/dropdown/Dropdown";
import { createTextOptions } from "../../../shared/atoms/dropdown/options/TextOption";
import { validatePasswordDetailed } from "../model/Validation";

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

  const [errors, setErrors] = useState({
    uid: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
  });

  const { register, isLoading, clearError } = useAuthStore();
  const { isRegisterOpen, closeAll, switchToLogin } = useAuthWidgetStore();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      setErrors({
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

    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "username":
        if (value.trim() === "") {
          error = "Никнейм обязателен";
        } else if (value.length < 8) {
          error = "Никнейм должен быть не менее 8 символов";
        }
        break;

      case "uid":
        if (value.trim() === "") {
          error = "UID обязателен";
        } else if (value.length !== 10) {
          error = "UID должен состоять из 10 символов";
        }
        break;

      case "email":
        if (value.trim() === "") {
          error = "Email обязателен";
        } else if (!emailRegex.test(value)) {
          error = "Неверный формат email";
        }
        break;

      case "password":
        if (value.trim() === "") {
          error = "Пароль обязателен";
        } else if (!validatePasswordDetailed(value)) {
          error = "Пароль должен быть сложнее";
        }
        break;

      case "confirmPassword":
        if (value.trim() === "") {
          error = "Подтверждение пароля обязательно";
        } else if (value !== formData.password) {
          error = "Пароли не совпадают";
        }
        break;

      case "birthDate":
        if (value.trim() === "") {
          error = "Дата рождения обязательна";
        } else if (calculateAge(value) < 13) {
          error = "Вам должно быть не менее 13 лет";
        }
        break;

      case "gender":
        if (value.trim() === "") {
          error = "Пол обязателен для выбора";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const isFormValid = (): boolean => {
    const {
      username,
      uid,
      email,
      password,
      confirmPassword,
      birthDate,
      gender,
    } = formData;

    if (
      !username.trim() ||
      !uid.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !birthDate.trim() ||
      !gender.trim()
    ) {
      return false;
    }

    if (
      username.length < 3 ||
      uid.length !== 10 ||
      !emailRegex.test(email) ||
      !validatePasswordDetailed(password) ||
      password !== confirmPassword ||
      calculateAge(birthDate) < 13
    ) {
      return false;
    }

    return Object.values(errors).every((error) => error === "");
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

    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field as keyof typeof formData]);
    });

    if (!isFormValid()) {
      return;
    }

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

  const isButtonDisabled = isLoading || !isFormValid();

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeAll}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          paddingRight: 20,
          paddingLeft: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "15px",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <LabeledIconButton
            label={<Label text={"DovCom"} color={"#fff"} fontSize={"20px"} />}
            icon={<Icon path={"/icons/logo.svg"} size={"55px"} />}
            labelPosition={"bottom"}
            gap={"0px"}
          />

          <Label text={"Регистрация"} fontSize={"30px"} color={"#fff"} />

          {/* Никнейм */}
          <TextInput
            label="Никнейм"
            placeholder="твой nickname"
            value={formData.username}
            onChange={(value) => handleChange("username", value)}
            error={errors.username}
            required
          />

          {/* Uid */}
          <TextInput
            label="UID из 10 Символов"
            placeholder="Ваш UID"
            value={formData.uid}
            onChange={(value) => handleChange("uid", value)}
            error={errors.uid}
            required
          />

          {/* Email */}
          <EmailInput
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            error={errors.email}
            required
          />

          {/* Пароль */}
          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            error={errors.password}
            required
          />

          {/* Подтверждение пароля */}
          <PasswordInput
            label="Подтверждение пароля"
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
            onChange={(value) => handleChange("confirmPassword", value)}
            error={errors.confirmPassword}
            required
          />

          {/* Дата рождения */}
          <DateInput
            label="Дата рождения"
            value={formData.birthDate}
            onChange={(value) => handleChange("birthDate", value)}
            max={getMaxBirthDate()}
            error={errors.birthDate}
            required
          />

          {/* Пол */}
          <div style={{ width: "100%" }}>
            <Dropdown
              options={createTextOptions([
                { value: "мужщина", text: "мужщина" },
                { value: "женщина", text: "женщина" },
              ])}
              onChange={(text) => handleChange("gender", text)}
              value={formData.gender}
            />
            {errors.gender && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: "12px",
                  marginTop: "4px",
                  paddingLeft: "4px",
                }}
              >
                {errors.gender}
              </div>
            )}
          </div>
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
            borderRadius="15px"
            height="50px"
            width="100%"
            disabled={isButtonDisabled}
            icon={isLoading ? <Icon path="/icons/loading.svg" /> : undefined}
          />
        </div>

        {/* Ссылка на вход */}
        <div
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6b7280",
            marginTop: "16px",
          }}
        >
          Уже есть аккаунт?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            style={{
              background: "none",
              border: "none",
              color: "#3b82f6",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Войти
          </button>
        </div>
      </form>
    </Modal>
  );
};
