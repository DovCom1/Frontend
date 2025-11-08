import React, { useState } from "react";
import Label from "../../shared/atoms/labels/Label";
import Icon from "../../shared/atoms/icons/Icon";
import Button from "../../shared/atoms/buttons/Button";

enum MainWindowType {
  Dialog,
  FriendsAndEnemies,
}

interface ChatsSidebarProps {
  onMainWindowTypeChange: (type: MainWindowType) => void;
}

const Sidebar: React.FC<ChatsSidebarProps> = ({ onMainWindowTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarButtons = [
    {
      label: <Label text={"Друзья и враги"} color={"#fff"} fontSize={"16px"} />,
      icon: (
        <Icon path={"/icons/friendsWhite.svg"} height={"18px"} width={"18px"} />
      ),
      function: () => {
        onMainWindowTypeChange(MainWindowType.FriendsAndEnemies);
      },
    },
    {
      label: (
        <Label text={"Видеоконференции"} color={"#fff"} fontSize={"16px"} />
      ),
      icon: (
        <Icon path={"/icons/cameraWhite.svg"} height={"18px"} width={"18px"} />
      ),
      function: () => {},
    },
    {
      label: (
        <Label text={"Создать новый чат"} color={"#fff"} fontSize={"16px"} />
      ),
      icon: (
        <Icon
          path={"/icons/createChatWhite.svg"}
          height={"18px"}
          width={"18px"}
        />
      ),
      function: () => {},
    },
    {
      label: <Label text={"Настройки"} color={"#fff"} fontSize={"16px"} />,
      icon: (
        <Icon
          path={"/icons/settingsWhite.svg"}
          height={"18px"}
          width={"18px"}
        />
      ),
      url: "/settings",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 20,
        width: isOpen ? "250px" : "60px",
        minWidth: "60px",
        height: "100vh",
        backgroundColor: "#1E1E22",
        padding: "20px 0px",
        transition: "width 0.3s ease",
        display: "flex",
        paddingLeft: isOpen ? "20px" : "0px",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: isOpen ? "flex-start" : "center",
          marginBottom: "12px",
        }}
      >
        <Button
          icon={
            <Icon
              path={"/icons/revealWhite.svg"}
              height={"20px"}
              width={"20px"}
            />
          }
          labelPosition={"right"}
          onClick={toggleSidebar}
        />
      </div>

      {sidebarButtons.map((button, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: isOpen ? "flex-start" : "center",
            marginBottom: "5px",
          }}
        >
          <Button
            label={isOpen ? button.label : <Label text={""} color={"#fff"} />}
            icon={button.icon}
            onClick={button.function}
            labelPosition={"right"}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
