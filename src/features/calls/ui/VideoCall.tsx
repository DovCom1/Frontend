import React from "react";
import { VideoCallProvider } from "../model/VideoCallContext";
import { VideoCallController } from "../model/VideoCallsController";

export const VideoCall: React.FC = () => {
    return (
        <VideoCallProvider>
            <VideoCallController />
        </VideoCallProvider>
    );
};
