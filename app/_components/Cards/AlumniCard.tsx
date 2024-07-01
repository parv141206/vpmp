import Image from "next/image";
import React from "react";

export default function AlumniCard({ name, position, src }: any) {
  return (
    <div className="p-3 flex flex-col w-fit gap-3 rounded-md shadow-lg">
      <div className="rounded-md">
        <Image
          className="rounded-md"
          src={src}
          alt="Asfaq"
          width={200}
          height={200}
        />
      </div>
      <div className="font-unkempt  my-1">
        <div className="font-bold">{name}</div>
        <div className="">{position}</div>
      </div>
    </div>
  );
}
