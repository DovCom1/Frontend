import React from "react";
import classes from "./MainPageButtons.module.css";

import IconButton from "../atoms/buttons/IconButton";
import buttonClasses from "../atoms/buttons/Button.module.css";

const MainPageButtons = () => {
    return <div className={classes.container}>
        <IconButton
            iconSize="70px"
            icon="/icons/linkBig.svg"
            color={"fff"}
            onClick={() => console.log("Clicked!")}
        />
        <IconButton
            icon="/icons/camWhite.svg"
            iconSize="70px"
            onClick={() => console.log("Clicked!")}
        />
        <IconButton
            icon="/icons/calendar.svg"
            iconSize="70px"
            onClick={() => console.log("Clicked!")}
        />

    </div>
};

export default MainPageButtons;
