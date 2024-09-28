"use client";

import { useState } from "react";
import MeetingType from "./MeetingType";
import { useRouter } from "next/navigation";

type MeetingStateType =
  | "isScheduleMeeting"
  | "isInstanteMeeting"
  | "isJoiningMeeting"
  | null;

function MeetingTypeList() {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<MeetingStateType>(null);

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetingType
        title="New Meeting"
        description="Start an instant meeting"
        backgroundColor="bg-orange-1"
        imageSrc="/icons/add-meeting.svg"
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingType
        title="Schedule Meeting"
        description="Schedule a meeting"
        backgroundColor="bg-purple-1"
        imageSrc="/icons/join-meeting.svg"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <MeetingType
        title="Join Meeting"
        description="Via invitation link"
        backgroundColor="bg-blue-1"
        imageSrc="/icons/schedule.svg"
        onClick={() => {}}
      />
      <MeetingType
        title="View Recordings"
        description="See all recordered meetings"
        backgroundColor="bg-yellow-1"
        imageSrc="/icons/recordings.svg"
        onClick={() => router.push("/recordings")}
      />
    </section>
  );
}

export default MeetingTypeList;
