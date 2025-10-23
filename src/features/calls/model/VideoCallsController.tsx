import React, { useEffect } from "react";
import { VideoCallMiniInterface } from "../ui/calls-mini/VideoCallMiniInterface";

export const VideoCallController: React.FC = () => {

    return (
        <VideoCallMiniInterface maxCols={4} maxRows={2} />
    );
}
