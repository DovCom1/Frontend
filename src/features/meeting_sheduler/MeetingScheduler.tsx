import React, { useState } from 'react';
import { InputField } from '../../shared/atoms/input-fields/InputField';
import Button from '../../shared/atoms/buttons/Button';
import Label from '../../shared/atoms/labels/Label';
import classes from './MeetingScheduler.module.css';
import { DateInput } from '../../shared/atoms/input-fields/DateInput';
import { Dropdown } from '../../shared/atoms/dropdown/Dropdown';
import { createIconTextOption, createIconTextOptions, renderFirstNIcons } from '../../shared/atoms/dropdown/options/IconTextOption';
import Icon from '../../shared/atoms/icons/Icon';
import { MultipleDropdown } from '../../shared/atoms/dropdown/MultipleDropdown';
import { getFriends } from './model/Utills';
import { DateTimeInput } from '../../shared/atoms/input-fields/DateTimeInput';

interface MeetingSchedulerProps {
  onSuccess?: () => void;
}

export const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ 
  onSuccess 
}) => {
  const [title, setTitle] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [date, setDate] = useState('');

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSubmit = () => {
    const meetingData = {
      title,
      maxParticipants: parseInt(maxParticipants),
      date: new Date(date)
    };
    
    console.log('Создаем встречу:', meetingData);
    alert(`Встреча "${title}" успешно создана!\nУчастников: ${maxParticipants}\nДата: ${new Date(date).toLocaleString()}`);
    
    setTitle('');
    setMaxParticipants('');
    setDate('');
    
    onSuccess?.();
  };

  const isFormValid = title.trim() && maxParticipants && date;

  return (
    <div className={classes.scheduler} style={{padding: 10, margin: 40}}>
      <h3 className={classes.title}>Запланировать встречу</h3>
      
      <div className={classes.form}>
        <InputField
          label="Название встречи"
          placeholder="Созвон по КРПО"
          value={title}
          onChange={setTitle}
          required
        />
        
        <InputField
          label="Максимальное количество участников"
          type="number"
          placeholder="50"
          value={maxParticipants}
          onChange={setMaxParticipants}
          required
        />
        
        <DateTimeInput
          label="Дата встречи"
          value={date}
          onChange={setDate}
        />

        <MultipleDropdown 
          options={getFriends()}
          renderSelected={(selected) => renderFirstNIcons(selected, 3)}
          onChange={setSelectedValues}
          value={selectedValues}
        />
        
        <Button
          label={<Label text="Запланировать встречу" />}
          onClick={handleSubmit}
          disabled={!isFormValid}
          width="100%"
          backgroundColor={isFormValid ? "#FF9500" : "#54565C"}
          height='1cm'
        />
      </div>
    </div>
  );
};
