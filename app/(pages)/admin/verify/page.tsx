"use client";
import OurAlumniCard from "@/app/_components/Cards/OurAlumniCard";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/db/images/temp");
        if (response.ok) {
          const res = await response.json();
          setImages(res);
          console.log(res);
        } else {
          console.error("Error fetching images:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);
  const handleVerify = async (id: any, branch: any) => {
    console.log(id);
    try {
      fetch("/api/db/images/temp", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, branch: branch }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {}
  };
  const handleDelete = async (id: any, branch: any) => {
    console.log(id);
    try {
      fetch("/api/db/images/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, branch: branch }),
      })
        .then((res) => res.json())
        .then((data) => alert("Deleted"))
        .then(async () => {
          const response = await fetch("/api/db/images/temp");
          if (response.ok) {
            const res = await response.json();
            setImages(res);
            console.log(res);
          } else {
            console.error("Error fetching images:", await response.text());
          }
        });
    } catch (error) {}
  };
  return (
    <div>
      {Object.keys(images).map((branch) => (
        <div
          key={branch}
          className="mb-10 flex items-center justify-center flex-col"
        >
          <div className="w-2/3">
            <h1 className="my-5 font-unkempt text-xl font-bold ">
              {getBranchName(branch)}
            </h1>
          </div>
          <div className="flex items-center p-5 justify-center w-full flex-col ">
            <div className="grid grid-cols-1  place-items-stretch  place-content-center  md:grid-cols-3 gap-5">
              {/* @ts-ignore */}
              {images[branch].length === 0 && (
                <p className="text-center text-xl">No images found</p>
              )}
              {images[branch].map((image: any) => (
                <OurAlumniCard
                  key={image.id}
                  name={image.name}
                  position={image.position}
                  company={image.company}
                  src={image.src}
                  className="shadow-md p-5"
                >
                  <div className="flex w-full items-center jusitfy-between gap-3">
                    <button
                      onClick={() => {
                        handleVerify(image.id, branch);
                      }}
                      className="bg-green-500/25 backdrop-blur-lg text-white px-2 my-1 py-1 rounded"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(image.id, branch);
                      }}
                      className="bg-red-500/25 backdrop-blur-lg text-white px-2 my-1 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </OurAlumniCard>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
//@ts-ignore
function getBranchName(branch) {
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
