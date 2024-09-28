import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IProps {
  backgroundColor: "bg-orange-1" | "bg-blue-1" | "bg-purple-1" | "bg-yellow-1";
  imageSrc: string;
  onClick: () => void;
  title: string;
  description: string;
}

function MeetingType({
  backgroundColor,
  imageSrc,
  onClick,
  title,
  description,
}: IProps) {
  return (
    <div
      className={cn(
        `px-4 py-6 flex flex-col justify-between w-full xl:max-w-[370px] min-h-[260px] rounded-[14px] cursor-pointer`,
        backgroundColor
      )}
      onClick={onClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={imageSrc} alt="meeting" width={27} height={27} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
}

export default MeetingType;
