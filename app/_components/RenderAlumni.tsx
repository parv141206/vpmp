"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OurAlumniCard from "./Cards/OurAlumniCard";

export default function RenderAlumni() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState({});
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/db/images");
        if (response.ok) {
          const res = await response.json();
          console.log(res);
          const imageData = res.reduce((acc, image) => {
            if (!acc[image.branch]) {
              acc[image.branch] = [];
            }
            acc[image.branch].push(image);
            return acc;
          }, {});
          setImages(imageData);
        } else {
          console.error("Error fetching images:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto relative p-5">
      <Image
        className="absolute md:block hidden right-20 -top-20"
        src={"/assets/svg/alumniArrow.svg"}
        width={200}
        height={200}
        alt="arrow"
      />
      <div className="text-5xl py-10 text-end">Our Alumnies!</div>
      {Object.keys(images).map((branch) => (
        <div
          key={branch}
          className="mb-10 flex items-center justify-center flex-col"
        >
          <div className="w-2/3">
            <h1 className="my-5 font-unkempt text-xl md:text-start text-center font-bold ">
              {branch === "ce"
                ? "Computer Engineering"
                : branch === "me"
                  ? "Mechanical Engineering"
                  : branch === "ee"
                    ? "Electrical Engineering"
                    : branch === "ec"
                      ? "Electronics and Communication Engineering"
                      : branch === "civil"
                        ? "Civil Engineering"
                        : ""}
            </h1>
          </div>
          <div className="flex items-center justify-center w-full flex-col ">
            <div className="grid grid-cols-1 w-fit place-items-stretch  place-content-center  md:grid-cols-3 gap-5">
              {images[branch].map((image) => (
                <OurAlumniCard
                  key={image._id}
                  name={image.name}
                  position={image.position}
                  src={image.src}
                  company={image.company}
                  className="shadow-md p-5"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
