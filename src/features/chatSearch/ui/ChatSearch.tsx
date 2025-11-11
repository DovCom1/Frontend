import React from "react";
import { Search } from "../../../shared/atoms/input-fields/search/Search";

interface ChatSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ChatSearch: React.FC<ChatSearchProps> = ({
  value,
  onChange,
  placeholder = "Поиск чатов",
}) => {
  return <Search value={value} onChange={onChange} placeholder={placeholder} />;
};
