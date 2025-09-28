import React from "react";

const renderIcon = (icon: string | undefined, iconStyle : React.CSSProperties) => {
    if (!icon) return null;

    if (
        typeof icon === "string" &&
        (icon.startsWith("http") || icon.includes("."))
    ) {
        return (
            <img src={icon} alt="" className="button-icon" style={iconStyle} />
        );
    } else if (typeof icon === "string") {
        return (
            <div className="button-icon" style={iconStyle}>
          {icon}
        </div>
        );
    } else {
        return (
            <div className="button-icon" style={iconStyle}>
          {icon}
        </div>
        );
    }
};

export default renderIcon;
