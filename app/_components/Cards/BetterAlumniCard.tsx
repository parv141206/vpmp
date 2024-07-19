"use client";
import React, { useState } from "react";

export default function BetterAlumniCard({
  name,
  position,
  company,
  src,
  batch,
  children,
  className,
  branch,
}: {
  name: string;
  position: string;
  company: string;
  src: string;
  batch?: string;
  branch?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const backgroundImageUrl = `url(${src})`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className} relative border border-yellow-950/20 font-unkempt  backdrop-blur-lg  py-5 group  flex flex-col justify-center items-center text-center rounded-md shadow-lg`}
    >
      <div
        className={`rounded-full h-36 w-36`}
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundPosition: "center",
          backgroundSize: "cover",
          transition: "transform 0.5s, opacity 0.5s",
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? "scale(0)" : "scale(1)",
        }}
      ></div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center`}
        style={{
          backgroundImage: backgroundImageUrl,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      ></div>
      <div className="  p-4  text-yellow-950 rounded-b-md">
        <div className="font-bold">{name}</div>
        <div className="text-lg">{position}</div>
        <hr className="my-1 border-yellow-600" />
        <div className="text-yellow-700">{company}</div>
        <div className="text-yellow-900">{batch}</div>
        {children}
      </div>
    </div>
  );
}
