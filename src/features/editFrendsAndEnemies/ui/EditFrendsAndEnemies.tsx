import React, { useState, useEffect } from "react";
import buttonClasses from "../../../shared/atoms/buttons/Button.module.css";
import { Modal } from "../../../shared/atoms/modal/Modal";
import { EmailInput } from "../../../shared/atoms/input-fields/EmailInput";
import { PasswordInput } from "../../../shared/atoms/input-fields/PasswordInput";
import Button from "../../../shared/atoms/buttons/Button";
import Label from "../../../shared/atoms/labels/Label";
import Icon from "../../../shared/atoms/icons/Icon";
import LabeledIconButton from "../../../shared/atoms/buttons/LabeledIconButton";

export const LoginWidget: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <Modal isOpen={true}>
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
          // onChange={handleEmailChange}
          error={emailError}
          required
        />
      </div>

      <div style={{ width: "90%", marginBottom: "24px" }}>
        <PasswordInput
          label="Пароль"
          placeholder="Введите пароль"
          value={password}
          // onChange={handlePasswordChange}
          error={passwordError}
          required
        />
      </div>
    </Modal>
  );
};
