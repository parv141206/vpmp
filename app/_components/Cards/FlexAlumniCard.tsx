import React from "react";
import Image from "next/image";

export default function FlexAlumniC({ name, position, src }: any) {
  return (
    <div
      className={`relative flex flex-col w-fit rounded-md shadow-lg bg-[${src}]`}
    >
      <Image
        className="rounded-md"
        src={src}
        alt="Student img"
        width={200}
        height={200}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4  from-black via-black/80 to-transparent bg-gradient-to-t text-white rounded-b-md">
        <div className="font-bold">{name}</div>
        <div>{position}</div>
      </div>
    </div>
  );
}
