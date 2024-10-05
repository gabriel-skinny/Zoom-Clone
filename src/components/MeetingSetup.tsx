"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface IProps {
  setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
}

function MeetingSetup({ setIsSetupComplete }: IProps) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  const joinMeeting = () => {
    call?.join();
    setIsSetupComplete(true);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 text-white">
      <h1 className="text-2xl font-bold">Video Preview</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={joinMeeting}
        className="rounded-md bg-green-500 px-4 py-2.5"
      >
        Join meeting
      </Button>
    </div>
  );
}

export default MeetingSetup;
