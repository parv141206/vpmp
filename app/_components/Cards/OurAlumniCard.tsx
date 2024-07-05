import React from "react";

export default function OurAlumniCard({ name, position, src, children }: any) {
  const backgroundImageUrl = `url(${src})`;

  return (
    <div
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative  justify-end bg-white h-60  flex flex-col rounded-md shadow-lg"
    >
      <div className=" bottom-0 bg-gradient-to-t from-black to-transparent left-0 right-0 p-4  text-white rounded-b-md">
        <div className="font-bold">{name}</div>
        <div>{position}</div>
        {children}
      </div>
    </div>
  );
}
