import React from "react";
import IconButton from "./IconButton";
import Label, {LabelProps} from "../labels/Label";
import {getFlexConfig} from "../../utils/setlabelPosition";
import classes from "./Button.module.css";
import Button from "./Button";
import Icon from "../icons/Icon";

interface LabeledIconButtonProps extends Omit<
    React.ComponentProps<typeof Button>,
    "borderRadius"
    >  {
    label: React.ReactElement<typeof Label>;
    icon: React.ReactElement<typeof Icon>;
}

// Кнопка в виде картинки и подписи к ней
const LabeledIconButton: React.FC<LabeledIconButtonProps> = ({
      labelPosition = "bottom",
    icon,
    label,
    ...buttonProps

}) => {

    return (
        <Button
            {...buttonProps}
            label={label}
            labelPosition={labelPosition}
            icon={icon}
        />
    )
};

export default LabeledIconButton;
