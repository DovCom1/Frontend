import React from "react";
import Icon from "../../icons/Icon";
import "./Search.css";

export interface SearchProps {
  onClick?: (value: string) => void;
  label?: string;
  pattern?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({
  onClick,
  placeholder = "Поиск...",
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    value = e.target.value;
    console.log(value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleOnClick = () => {
    console.log(value);
    if (onClick) {
      onClick(value);
    }
  };

  var value = "";
  return (
    <div className="search-container">
      <input
        className="search-input"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button className="search-icon-container" onClick={handleOnClick}>
        <Icon path={"/icons/search.svg"} height={"16px"} width={"16px"} />
      </button>
    </div>
  );
};
