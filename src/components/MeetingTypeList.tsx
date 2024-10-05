"use client";

import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import MeetingType from "./MeetingType";

type MeetingStateType =
  | "isScheduleMeeting"
  | "isInstantMeeting"
  | "isJoiningMeeting"
  | null;

function MeetingTypeList() {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<MeetingStateType>(null);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetingType
        title="New Meeting"
        description="Start an instant meeting"
        backgroundColor="bg-orange-1"
        imageSrc="/icons/add-meeting.svg"
        onClick={() => setMeetingState("isInstantMeeting")}
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
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingType
        title="View Recordings"
        description="See all recordered meetings"
        backgroundColor="bg-yellow-1"
        imageSrc="/icons/recordings.svg"
        onClick={() => router.push("/recordings")}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(null)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        onClick={createMeeting}
      />
    </section>
  );
}

export default MeetingTypeList;
