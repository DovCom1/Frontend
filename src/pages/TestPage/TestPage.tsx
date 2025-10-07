import React, { useState } from "react";
import Button from "../../shared/atoms/buttons/Button";
import Label from "../../shared/atoms/labels/Label";
import Icon from "../../shared/atoms/icons/Icon";
import { InputField } from "../../shared/atoms/input-fields/InputField";
import { Modal } from "../../shared/atoms/modal/Modal";
import { MeetingScheduler } from "../../features/meeting_sheduler/MeetingScheduler";
import buttonClasses from "../../shared/atoms/buttons/Button.module.css";
import classes from './TestPage.module.css';
import { text } from 'stream/consumers';
import { TextInput } from '../../shared/atoms/input-fields/TextInput';
import { EmailInput } from '../../shared/atoms/input-fields/EmailInput';
import { PasswordInput } from '../../shared/atoms/input-fields/PasswordInput';
import { DateInput } from '../../shared/atoms/input-fields/DateInput';
import { DateTimeInput } from '../../shared/atoms/input-fields/DateTimeInput';
import { Dropdown } from '../../shared/atoms/dropdown/Dropdown';
import { createIconTextOptions, renderFirstNIcons } from '../../shared/atoms/dropdown/options/IconTextOption';
import { MultipleDropdown } from '../../shared/atoms/dropdown/MultipleDropdown';
import { createTextOptions } from '../../shared/atoms/dropdown/options/TextOption';

export const TestPage: React.FC = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [email, setEmail] = useState("");
  const [textValue, setTextValue] = useState("");
  const [password, setPassword] = useState("");

  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

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
          <h2>Выпадающие списки</h2>
          <div className={classes.componentsGrid}>
            <Dropdown
              label='Микрофон'
              options={createTextOptions([
                { value: '1', text: 'Встроеный микрофон'},
                { value: '2', text: 'Микрофон гарнитуры'},
                { value: '3', text: 'Петличка'},
                { value: '4', text: 'Бумажный стаканчик'},
                { value: '5', text: 'Буду сам записывать и передавать в двоичном коде'},
              ])}
              onChange={setSelectedValue}
              value={selectedValue}
            />
            <MultipleDropdown
              label='Участники'
              options={createIconTextOptions([
                { value: '1', icon: <Icon path="https://i.pravatar.cc/" size='100px' />, text: 'Name1'},
                { value: '2', icon: <Icon path="https://i.pravatar.cc/100" size='100px' />, text: 'Name2'},
                { value: '3', icon: <Icon path="https://i.pravatar.cc/101" size='100px' />, text: 'Name3'},
                { value: '4', icon: <Icon path="https://i.pravatar.cc/102" size='100px' />, text: 'Name4'},
                { value: '5', icon: <Icon path="https://i.pravatar.cc/103" size='100px' />, text: 'Name5'},
                { value: '6', icon: <Icon path="https://i.pravatar.cc/104" size='100px' />, text: 'Name6'},
                { value: '7', icon: <Icon path="https://i.pravatar.cc/105" size='100px' />, text: 'Name7'},
                { value: '8', icon: <Icon path="https://i.pravatar.cc/106" size='100px' />, text: 'Name8'},
                { value: '9', icon: <Icon path="https://i.pravatar.cc/107" size='100px' />, text: 'Name9'},
                { value: '10', icon: <Icon path="https://i.pravatar.cc/108" size='100px' />, text: 'Name10'},
                { value: '11', icon: <Icon path="https://i.pravatar.cc/109" size='100px' />, text: 'Name11'},
                { value: '12', icon: <Icon path="https://i.pravatar.cc/110" size='100px' />, text: 'Name12'},
                { value: '13', icon: <Icon path="https://i.pravatar.cc/111" size='100px' />, text: 'Name13'},
                { value: '14', icon: <Icon path="https://i.pravatar.cc/112" size='100px' />, text: 'Name14'},
                { value: '15', icon: <Icon path="https://i.pravatar.cc/113" size='100px' />, text: 'Name15'},
              ])}
              onChange={setSelectedValues}
              value={selectedValues}
              renderSelected={(selected) => renderFirstNIcons(selected, 6)}
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
