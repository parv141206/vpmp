import React from "react";
import Image from "next/image";

export default function SpecialCard({ name, position, src }: any) {
  return (
    <div className="relative flex flex-col w-fit rounded-md shadow-lg">
      <Image
        className="rounded-md"
        src={src}
        alt="Student img"
        width={200}
        height={200}
      />
      <div className="absolute z-10 top-0 w-full h-full left-0 from-black via-black/80 to-transparent bg-gradient-to-t"></div>
      <div className="absolute top-2/3 text-center z-20 left-0 right-0 p-4 flex flex-col gap-1   text-white rounded-b-md">
        <div className="font-bold text-xl">{name}</div>
        <hr />
        <div>{position}</div>
      </div>
    </div>
  );
}
