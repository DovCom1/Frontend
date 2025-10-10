import React, { useState } from "react";
import Label from "../../shared/atoms/labels/Label";
import Icon from "../../shared/atoms/icons/Icon";
import LinkButton from "../../shared/atoms/buttons/LinkButton";
import Button from "../../shared/atoms/buttons/Button";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarButtons = [
    {
      label: <Label text={"Друзья и враги"} color={"#fff"} fontSize={"16px"} />,
      icon: (
        <Icon path={"/icons/friendsWhite.svg"} height={"16px"} width={"16px"} />
      ),
      url: "/friends",
    },
    {
      label: (
        <Label text={"Видеоконференции"} color={"#fff"} fontSize={"16px"} />
      ),
      icon: (
        <Icon path={"/icons/cameraWhite.svg"} height={"16px"} width={"16px"} />
      ),
      url: "/video",
    },
    {
      label: (
        <Label text={"Создать новый чат"} color={"#fff"} fontSize={"16px"} />
      ),
      icon: (
        <Icon
          path={"/icons/createChatWhite.svg"}
          height={"16px"}
          width={"16px"}
        />
      ),
      url: "/new-chat",
    },
    {
      label: <Label text={"Настройки"} color={"#fff"} fontSize={"16px"} />,
      icon: (
        <Icon
          path={"/icons/settingsWhite.svg"}
          height={"16px"}
          width={"16px"}
        />
      ),
      url: "/settings",
    },
  ];

  return (
    <div
      style={{
        width: isOpen ? "250px" : "50px",
        height: "100vh",
        backgroundColor: "#1E1E22",
        padding: "20px 0px",
        transition: "width 0.3s ease",
        display: "flex",
        paddingLeft: "10px",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: isOpen ? "flex-start" : "center",
        }}
      >
        <Button
          icon={
            <Icon
              path={"/icons/revealWhite.svg"}
              height={"24px"}
              width={"24px"}
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
          }}
        >
          <LinkButton
            label={isOpen ? button.label : <Label text={""} color={"#fff"} />}
            icon={button.icon}
            url={button.url}
            labelPosition={"right"}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
