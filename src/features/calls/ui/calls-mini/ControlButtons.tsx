import React from "react";
import classes from "./ControlButtons.module.css"
import Grid from "../../../../shared/molecules/Grid";
import IconButton from "../../../../shared/atoms/buttons/IconButton";
import Icon from "../../../../shared/atoms/icons/Icon";

interface ControlButtonsProps {
    className?: string;
    isCameraOn: boolean;
    isMicroOn: boolean;
    onToggleCamera: () => void;
    onToggleMicrophone: () => void;
    onEmotionsButtonClick: () => void;
    onFullscreenClick: () => void;
    onEndCallClick: () => void;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
    isCameraOn,
    isMicroOn,
    onToggleCamera,
    onToggleMicrophone,
    onEmotionsButtonClick,
    onFullscreenClick,
    onEndCallClick
}) => {

    const getButtonClass = (additionalClass: string = "") => {
        return `${classes.button} ${additionalClass}`.trim();
    };

    return (
        <div className={classes.controlPanel}>
            <Grid 
                cols={5} 
                rows={1}
                horizontalGap="2cm"
                elements={[
                    <IconButton
                        key="camera"
                        onClick={onToggleCamera} 
                        icon={
                            <Icon 
                                path={isCameraOn ? "/icons/cameraOffWhite.svg" : "/icons/cameraOffWhite.svg"}
                            />
                        }
                        className={getButtonClass(isCameraOn ? "" : classes.disabled)}
                    />,
                    <IconButton 
                        key="microphone"
                        onClick={onToggleMicrophone} 
                        icon={
                            <Icon 
                                path={isMicroOn ? "/icons/microWhite.svg" : "/icons/microWhite.svg"}
                            />
                        }
                        className={getButtonClass(isMicroOn ? "" : classes.disabled)}
                    />,
                    <IconButton 
                        key="emotions"
                        onClick={onEmotionsButtonClick} 
                        icon={<Icon path="/icons/smileFaceWhite.svg" />}
                        className={getButtonClass()}
                    />,
                    <IconButton 
                        key="fullscreen"
                        onClick={onFullscreenClick} 
                        icon={<Icon path="/icons/openFullscreenWhite.svg" />}
                        className={getButtonClass()}
                    />,
                    <IconButton 
                        key="end-call"
                        onClick={onEndCallClick} 
                        icon={<Icon path="/icons/phoneOffWhite.svg" />}
                        className={getButtonClass(classes.endCall)}
                    />,
                ]}
            />
        </div>
    );
};
