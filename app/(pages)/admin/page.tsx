"use client";
import OurAlumniCard from "@/app/_components/Cards/OurAlumniCard";
import { useState } from "react";
import Image from "next/image";
import Dashboard from "@/app/_components/Dashboard";

export default function Home() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState(""); // added branch state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
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

  return (
    <>
      <div className="flex items-center justify-center p-5">
        <div className="bg-sky-50 flex flex-col gap-5 items-center justify-around md:w-2/3 w-full text-black rounded-xl p-5">
          <Dashboard />
          <div className="flex flex-col">
            <div className="text-xl text-black/75 font-bold ">Add Alumni</div>
          </div>
          <div className="flex justify-around md:flex-row flex-col gap-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 w-full items-start "
            >
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
              <label htmlFor="batch">Batch</label>
              <input type="text" name="batch" />
              <label htmlFor="position">Position</label>
              <input type="text" name="position" />
              <label htmlFor="branch">Branch</label>
              <select name="branch" value={branch} onChange={handleInputChange}>
                <option value="ce">CE</option>
                <option value="me">ME</option>
                <option value="ec">EC</option>
                <option value="ee">EE</option>
                <option value="civil">Civil</option>
              </select>
              <label htmlFor="image">
                Please enter your image. Ensure the following,
              </label>
              <input type="file" onChange={handleFileChange} />
              <button className="submit" type="submit">
                Upload Image
              </button>
            </form>
            <Image
              src={"/assets/svg/formdoodle.svg"}
              width={200}
              height={200}
              alt="Doodle"
            />
          </div>
        </div>
      </div>
      <div className="bg-sky-50 max-w-lg mx-auto shadow-lg rounded-lg overflow-hidden p-3">
        <div className="p-4">
          <div className=" p-2 text-xl font-bold text-black/75 flex">
            Get Alumni
          </div>
          <p className="text-gray-600 mt-2">
            Click Fetch button to get Alumni Data
          </p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={fetchImages}
          >
            Fetch Images
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full flex-col ">
        <div className="grid grid-cols-1 w-fit place-items-stretch  place-content-center  md:grid-cols-3 gap-5">
          {images.map((image) => (
            <OurAlumniCard
              key={image._id}
              name={image.name}
              position={image.position}
              src={image.src}
              className="shadow-md p-5"
            />
          ))}
        </div>
      </div>
    </>
  );
}
