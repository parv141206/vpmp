import Image from "next/image";
import React from "react";

export default function AlumniCard({
  name,
  position,
  src,
  company,
  batch,
  branch,
}: any) {
  return (
    <div className="p-3 flex flex-col w-fit gap-3 rounded-md shadow-lg h-full min-h-96">
      <div className="rounded-md w-fit">
        <Image
          className="rounded-md "
          src={src}
          alt="Asfaq"
          width={200}
          height={200}
        />
      </div>
      <div className="md:font-unkempt my-1">
        <div className="font-bold">{name}</div>
        <div className="text-wrap">{position}</div>
        <div className="text-wrap">{company}</div>
        <div className="">{batch}</div>
        <div className="">{branch}</div>
      </div>
    </div>
  );
}
