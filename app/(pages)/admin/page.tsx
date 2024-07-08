"use client";
import OurAlumniCard from "@/app/_components/Cards/OurAlumniCard";
import { useState } from "react";
import Image from "next/image";
import Dashboard from "@/app/_components/Dashboard";
import ImportAlumni from "@/app/_components/ImportAlumni";
import { fetchData } from "next-auth/client/_utils";

export default function Home() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState(""); // added branch state
  //@ts-ignore
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  //@ts-ignore
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "batch":
        setBatch(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "branch": // added branch case
        setBranch(value);
        break;
      default:
        break;
    }
  };
  //@ts-ignore
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    //@ts-ignore
    formData.append("image", file);
    formData.append("name", name);
    formData.append("batch", batch);
    formData.append("position", position);
    formData.append("company", company);
    formData.append("branch", branch); // added branch to formData

    try {
      const response = await fetch("/api/db/images", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      if (response.ok) {
        fetchImages();
      } else {
        console.error("Error uploading image:", res.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/db/images");
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        const imageData = res;
        setImages(imageData);
      } else {
        console.error("Error fetching images:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  const handleDelete = async (id: any, branch: any) => {
    console.log(id);
    console.log("_______________________", branch);
    try {
      fetch("/api/db/images/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, branch: branch }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data)).then(async () => {
          fetchImages()
        })
    } catch (error) { }

  };
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <ImportAlumni />
        <div className="flex justify-center flex-col w-full">
          <div className="justify-center text-center p-2 text-xl font-bold text-black/75 flex">
            Get Alumni
          </div>
          <button
            className="rounded p-3 m-3 dark:bg-blue-400"
            onClick={fetchImages}
          >
            Fetch Images
          </button>
        </div>
      </div>
      <div className="p-5 flex items-center justify-center w-full flex-col ">
        <div className="opacity-90 grid grid-cols-1 w-fit place-items-stretch  place-content-center  md:grid-cols-3 gap-5">
          {images.map((image) => (
            <OurAlumniCard
              //@ts-ignore
              key={image._id}
              //@ts-ignore
              name={image.name}
              //@ts-ignore
              position={image.position}
              //@ts-ignore
              src={image.src}
              className="shadow-md p-5"
            >
              <button
                onClick={() => {
                  //@ts-ignore
                  handleDelete(image.id, image.branch);
                }}
                className="bg-red-500/25 backdrop-blur-lg text-white px-2 my-1 py-1 rounded"
              >
                Delete
              </button>
            </OurAlumniCard>
          ))}
        </div>
      </div>
    </div>
  );
}
