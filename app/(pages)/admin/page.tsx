"use client";
import OurAlumniCard from "@/app/_components/Cards/OurAlumniCard";
import { useState } from "react";
import Image from "next/image";
import Dashboard from "@/app/_components/Dashboard";
import ImportAlumni from "@/app/_components/ImportAlumni";
import { fetchData } from "next-auth/client/_utils";
import BetterAlumniCard from "@/app/_components/Cards/BetterAlumniCard";

export default function Home() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState(""); // added branch state
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState("");

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
        .then((data) => console.log(data))
        .then(async () => {
          fetchImages();
        });
    } catch (error) {}
  };

  const handleFilter = (e: any) => {
    const inputValue = e.target.value;
    setFilterInput(inputValue);

    let temp = [];
    Object.values(images).forEach((e: Array<any>) => {
      const filtered = e.filter((a) => {
        if (a.eno) {
          return a.eno.includes(inputValue);
        }
        return false;
      });
      if (filtered.length !== 0) {
        temp.push(...filtered);
      }
    });
    setFilteredData(temp);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-5 gap-7">
        <ImportAlumni />
        <div className="flex justify-start items-start flex-col w-full">
          <div className="justify-center text-center p-2 text-xl font-bold text-black/75 flex">
            Get Alumni
          </div>
          <button className="btn" onClick={fetchImages}>
            Fetch Images
          </button>
        </div>
      </div>
      <div className="p-5 flex items-start justify-start w-full flex-col ">
        <div>Enter enrollment number to filter</div>
        <input
          type="text"
          value={filterInput}
          placeholder="Enrollment Number"
          onChange={handleFilter}
        />
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {filterInput !== "" && filteredData.length !== 0 ? (
            <>
              {filteredData.map((image) => (
                <BetterAlumniCard
                  key={image._id}
                  name={image.name}
                  position={image.position}
                  src={image.src}
                  batch={image.batch}
                  company={image.company}
                  className="shadow-md p-5"
                >
                  <button
                    onClick={() => {
                      handleDelete(image._id, image.branch);
                    }}
                    className="delete"
                  >
                    Delete
                  </button>
                </BetterAlumniCard>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>

        {Object.keys(images).map((branch) => (
          <div
            key={branch}
            className="mb-10 flex items-start justify-start flex-col"
          >
            <div className="">
              <h1 className="mb-7  font-unkempt text-3xl md:text-start text-center font-bold ">
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
                  <BetterAlumniCard
                    key={image._id}
                    name={image.name}
                    position={image.position}
                    src={image.src}
                    branch={image.branch}
                    company={image.company}
                    className="shadow-md p-5"
                  >
                    <button
                      onClick={() => {
                        handleDelete(image.id, image.branch);
                      }}
                      className="delete"
                    >
                      Delete
                    </button>
                  </BetterAlumniCard>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
