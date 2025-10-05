import React, { useState } from "react";
import Button from "../../shared/atoms/buttons/Button";
import Label from "../../shared/atoms/labels/Label";
import Icon from "../../shared/atoms/icons/Icon";
import { InputField } from "../../shared/atoms/input-fields/InputField";
import { Modal } from "../../shared/atoms/modal/Modal";
import { MeetingScheduler } from "../../features/meeting_sheduler/MeetingScheduler";
import buttonClasses from "../../shared/atoms/buttons/Button.module.css";
import classes from "./TestPage.module.css";
import { TextInput } from "../../shared/atoms/input-fields/TextInput";
import { EmailInput } from "../../shared/atoms/input-fields/EmailInput";
import { PasswordInput } from "../../shared/atoms/input-fields/PasswordInput";
import { DateInput } from "../../shared/atoms/input-fields/DateInput";
import { DateTimeInput } from "../../shared/atoms/input-fields/DateTimeInput";

export const TestPage: React.FC = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [email, setEmail] = useState("");
  const [textValue, setTextValue] = useState("");
  const [password, setPassword] = useState("");

  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);

  return (
    <div className={classes.testPage}>
      <header className={classes.header}>
        <h1>🧪 Страница тестирования компонентов</h1>
        <p>Здесь мы тестируем все наши новые компоненты</p>
      </header>

      <div className={classes.content}>
        <section className={classes.section}>
          <h2>📝 Текстовые поля (TextField)</h2>
          <div className={classes.componentsGrid}>
            <TextInput
              label="Обычное текстовое поле"
              placeholder="Введите текст..."
              value={textValue}
              onChange={setTextValue}
            />

            <EmailInput
              label="Email поле"
              placeholder="user@example.com"
              value={email}
              onChange={setEmail}
              error={
                email && !email.includes("@") ? "Неверный формат email" : ""
              }
            />

            <PasswordInput
              label="Пароль"
              placeholder="Введите пароль"
              value={password}
              onChange={setPassword}
            />

            <InputField
              label="Числовое поле"
              type="number"
              placeholder="Введите число"
              value={participants}
              onChange={setParticipants}
            />

            <InputField
              label="Обязательное поле"
              placeholder="Это поле обязательно"
              value={meetingTitle}
              onChange={setMeetingTitle}
              required
            />

            <InputField
              label="Отключенное поле"
              value="Это поле нельзя изменить"
              disabled
            />

            <InputField
              label="Ошибочное поле"
              value={textValue}
              error="Validation fail"
              onChange={setTextValue}
            />

            <DateInput label="Поле выбора даты" />

            <DateTimeInput label="Поле выбора даты и времени" />
          </div>
        </section>

        <section className={classes.section}>
          <h2>🔄 Кнопки</h2>
          <div className={classes.buttonsRow}>
            <Button
              className={buttonClasses.defaultButtonBlue}
              label={<Label text="Обычная кнопка" />}
              onClick={() => console.log("Клик!")}
            />

            <Button
              className={buttonClasses.defaultButtonOrange}
              label={<Label text="Кнопка с иконкой" />}
              icon={<Icon path="/icons/star.svg" />}
              labelPosition="right"
            />

            <Button
              className={buttonClasses.defaultWarningButton}
              label={<Label text="Опасное действие" />}
            />

            <Button
              className={buttonClasses.defaultButtonBlue}
              label={<Label text="Неактивная" />}
              disabled={true}
            />
          </div>
        </section>

        <section className={classes.section}>
          <h2>🎯 Виджеты и модальные окна</h2>
          <div className={classes.buttonsRow}>
            <Button
              className={buttonClasses.defaultButtonBlue}
              label={<Label text="Открыть планировщик встреч" />}
              icon={<Icon path="/icons/calendar.svg" />}
              onClick={() => setIsMeetingModalOpen(true)}
            />

            <Button
              className={buttonClasses.defaultButtonOrange}
              label={<Label text="Простая модалка" />}
              onClick={() => setIsSimpleModalOpen(true)}
            />
          </div>
        </section>

        <section className={classes.section}>
          <h2>👀 Текущие значения полей</h2>
          <div className={classes.preview}>
            <div className={classes.previewItem}>
              <strong>Текст:</strong> {textValue || "не указано"}
            </div>
            <div className={classes.previewItem}>
              <strong>Email:</strong> {email || "не указан"}
            </div>
            <div className={classes.previewItem}>
              <strong>Пароль:</strong> {password ? "••••••" : "не указан"}
            </div>
            <div className={classes.previewItem}>
              <strong>Участники:</strong> {participants || "не указано"}
            </div>
            <div className={classes.previewItem}>
              <strong>Название встречи:</strong> {meetingTitle || "не указано"}
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
      >
        <MeetingScheduler />
      </Modal>

      <Modal
        isOpen={isSimpleModalOpen}
        onClose={() => setIsSimpleModalOpen(false)}
        title="Простая модалка"
      >
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Это простая модалка для тестирования!</p>
          <Button
            className={buttonClasses.defaultButtonBlue}
            label={<Label text="Закрыть" />}
            onClick={() => setIsSimpleModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TestPage;
