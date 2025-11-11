import React from "react";
import Icon from "../../icons/Icon";
import "./Search.css";

export interface SearchProps {
  value?: string;
  onClick?: () => void;
  label?: string;
  pattern?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({
  value = "",
  onClick,
  placeholder = "Поиск...",
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button className="search-icon-container" onClick={onClick}>
        <Icon path={"/icons/search.svg"} height={"16px"} width={"16px"} />
      </button>
    </div>
  );
};

export const SearchFlex: React.FC<SearchProps> = ({
  value,
  onClick,
  placeholder = "Поиск...",
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button className="search-icon-container-flex" onClick={onClick}>
        <Icon path={"/icons/search.svg"} height={"24px"} width={"24px"} />
      </button>
    </div>
  );
};
