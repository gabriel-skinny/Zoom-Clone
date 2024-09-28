"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useEffect, useState } from "react";

function getTimeString() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
}

function Home() {
  const [time, setTime] = useState(getTimeString());

  const dateString = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  }).format(new Date());

  useEffect(() => {
    setInterval(() => {
      const timeString = getTimeString();

      setTime(timeString);
    }, 1000 * 60);
  }, [time]);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded-py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 Pm
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {dateString}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
}

export default Home;
