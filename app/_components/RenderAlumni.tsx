"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OurAlumniCard from "./Cards/OurAlumniCard";
import BetterAlumniCard from "./Cards/BetterAlumniCard";
import Link from "next/link";

interface ImageData {
  _id: string;
  name: string;
  position: string;
  src: string;
  company: string;
  batch: string;
  branch: string;
}

interface BranchImages {
  [branch: string]: ImageData[];
}

interface SelectedBatch {
  [branch: string]: string;
}

export default function RenderAlumni() {
  const [images, setImages] = useState<BranchImages>({});
  const [selectedBatch, setSelectedBatch] = useState<SelectedBatch>({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/db/images");
        if (response.ok) {
          const res = await response.json();
          const imageData: BranchImages = res.reduce(
            (acc, image: ImageData) => {
              if (!acc[image.branch]) {
                acc[image.branch] = [];
              }
              acc[image.branch].push(image);
              return acc;
            },
            {}
          );
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

  const handleBatchChange = (branch: string, batch: string) => {
    setSelectedBatch((prevBatch) => ({ ...prevBatch, [branch]: batch }));
  };

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
          <div className="w-full flex items-center justify-between">
            <h1 className="my-10 font-unkempt text-3xl md:text-start text-center font-bold">
              {getBranchName(branch)}
            </h1>
            <select
              className="bg-yellow-50 text-black border border-gray-800"
              name="batch"
              id=""
              value={selectedBatch[branch] || ""}
              onChange={(e) => handleBatchChange(branch, e.target.value)}
            >
              <option value="">All</option>
              {[...new Set(images[branch].map((image) => image.batch))]
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center justify-center w-full flex-col">
            <div className="grid grid-cols-1 w-fit place-items-stretch place-content-center gap-5">
              <div className="grid grid-cols-1 w-fit place-items-stretch place-content-center md:grid-cols-4 gap-5">
                {selectedBatch[branch]
                  ? images[branch]
                      .filter((image) => image.batch === selectedBatch[branch])
                      .map((image) => (
                        <BetterAlumniCard
                          key={image._id}
                          name={image.name}
                          position={image.position}
                          src={image.src}
                          company={image.company}
                          batch={image.batch}
                          className="shadow-md p-5"
                        />
                      ))
                  : images[branch].map((image) => (
                      <BetterAlumniCard
                        key={image._id}
                        name={image.name}
                        position={image.position}
                        src={image.src}
                        company={image.company}
                        batch={image.batch}
                        className="shadow-md p-5"
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="my-10 rounded-md bg-blue-900 p-3 w-2/3 text-white">
        Found mistake in your information or want to update anything???
        <br />
        <Link href="/update">
          <button className="button hover:bg-blue-700 bg-blue-800 my-1 p-3 w-fit">
            Click here to Update!
          </button>
        </Link>
      </div>
    </div>
  );
}

function getBranchName(branch: string) {
  switch (branch) {
    case "ce":
      return "Computer Engineering";
    case "me":
      return "Mechanical Engineering";
    case "ee":
      return "Electrical Engineering";
    case "ec":
      return "Electronics and Communication Engineering";
    case "civil":
      return "Civil Engineering";
    default:
      return branch;
  }
}
