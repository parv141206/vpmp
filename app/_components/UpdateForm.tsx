"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import sendEmail from "../_utils/email";

export default function UpdateForm() {
  const [eno, setEno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [college, setCollege] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const endpoint =
      status === "study"
        ? "/api/db/images/temp/student"
        : "/api/db/images/update";

    try {
      if (endpoint === "/api/db/images/update") {
        const response = await fetch(endpoint, {
          method: "PUT",
          body: formData,
        });
        const res = await response.json();
        if (response.ok) {
          fetchImages();
        }
        alert("Submitted successfully");
      } else {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
        const res = await response.json();
        if (response.ok) {
          fetchImages();
        }
        alert("Submitted successfully");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/db/images/temp");
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        // setImages(imageData); // removed since we're not using states
      } else {
        console.error("Error fetching images:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" flex md:flex-row flex-col gap-5 items-center justify-around w-full text-black rounded-xl p-5">
        <div className="flex justify-around md:flex-col flex-col gap-10 w-full md:w-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full md:w-auto"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="eno">Enrollment Number</label>
                <input
                  type="text"
                  name="eno"
                  placeholder="Your Enrollment Number"
                  value={eno}
                  onChange={(e) => setEno(e.target.value)}
                  required
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your_email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="batch">Batch</label>
                <input
                  type="text"
                  name="batch"
                  placeholder="2022"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  required
                  className="border rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="branch">Branch</label>
              <select
                name="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="border rounded-md p-2"
              >
                <option value="">Select Branch</option>
                <option value="ce">CE</option>
                <option value="me">ME</option>
                <option value="ec">EC</option>
                <option value="ee">EE</option>
                <option value="civil">Civil</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="border rounded-md p-2"
              >
                <option value="">Select Status</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
              </select>
            </div>
            {status === "work" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="border rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    name="position"
                    placeholder="CEO | Developer | ....."
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="border rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="workExperience">Work Experience</label>
                  <input
                    type="text"
                    name="workExperience"
                    placeholder="e.g., 5 years"
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
            )}
            {status === "study" && (
              <div className="flex flex-col">
                <label htmlFor="college">College Name</label>
                <input
                  type="text"
                  name="college"
                  placeholder="Your college name"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="image">
                Please enter your image. Ensure the following,
              </label>
              <div className="p-3">
                <ul className="list-disc list-inside">
                  <li>Formal dressed</li>
                  <li>High resolution</li>
                  <li>jpg/png/webp</li>
                </ul>
              </div>
              <input
                type="file"
                className="w-full border rounded-md p-2"
                name="image"
                required
              />
            </div>
            <button
              className="submit bg-green-500 text-white rounded-md p-2"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
        <Image
          src={"/assets/svg/formdoodle.svg"}
          width={200}
          height={200}
          alt="Doodle"
        />
      </div>
    </div>
  );
}
