"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import sendEmail from "../_utils/email";

export default function Form() {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const [status, setStatus] = useState(""); // New state for work/study status

  useEffect(() => {
    let interval;
    if (cooldownTimer > 0) {
      interval = setInterval(() => {
        setCooldownTimer(cooldownTimer - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
    }
    return () => clearInterval(interval);
  }, [cooldownTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    console.log("uC", userCode, "code", code);
    if (parseInt(userCode) !== parseInt(code)) {
      alert("Invalid OTP");
      return;
    }

    const endpoint = status === "study" ? "/api/db/images/temp/student" : "/api/db/images/temp";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      if (response.ok) {
        fetchImages();
        alert("Submitted successfully");
      } else {
        console.error("Error uploading image:", res.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    if (cooldownTimer > 0) {
      alert(`Please wait ${cooldownTimer} seconds before requesting a new OTP.`);
      return;
    }
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    //@ts-ignore
    setCode(randomCode);
    sendEmail(email, randomCode);
    setOtpSent(true);
    setCooldownTimer(15);
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/db/images/temp");
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        const imageData = res;
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
      <div className="bg-sky-50 flex md:flex-row flex-col gap-5 items-center justify-around w-full text-black rounded-xl p-5">
        <div className="flex justify-around md:flex-col flex-col gap-10">
          <div className="flex flex-col">
            <div className="text-xl text-black/75 ">Are you an alumni?</div>
            <div className="text-5xl ">Join Us!</div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full items-start">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Your Full Name" required />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="your_email@gmail.com" onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="batch">Batch</label>
            <input type="text" name="batch" placeholder="2022" required />
            <label htmlFor="branch">Branch</label>
            <select name="branch" required>
              <option value="ce">CE</option>
              <option value="me">ME</option>
              <option value="ec">EC</option>
              <option value="ee">EE</option>
              <option value="civil">Civil</option>
            </select>
            <label htmlFor="status">Status</label>
            <select name="status" onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
            </select>
            {status === "work" && (
              <>
                <label htmlFor="company">Company</label>
                <input type="text" name="company" placeholder="Your company name" />
                <label htmlFor="position">Position</label>
                <input type="text" name="position" placeholder="CEO | Developer | ....." />
                <label htmlFor="workExperience">Work Experience</label>
                <input type="text" name="workExperience" placeholder="e.g., 5 years" />
              </>
            )}
            {status === "study" && (
              <>
                <label htmlFor="college">College Name</label>
                <input type="text" name="college" placeholder="Your college name" />
              </>
            )}
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
            <input type="file" className="w-full" name="image" required />
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={(e) => {
                  handleSendEmail(e);
                }}
                className="p-3 bg-green-300 text-black"
                disabled={isDisabled}
              >
                Get OTP on Email
              </button>
              {cooldownTimer > 0 && (
                <div>
                  Please wait {cooldownTimer} seconds before requesting a new OTP.
                </div>
              )}
              <input type="text" name="code" onChange={(e) => setUserCode(e.target.value)} placeholder="OTP" required />
            </div>
            <button className="submit" type="submit">
              Upload Image
            </button>
          </form>
        </div>
        <Image src={"/assets/svg/formdoodle.svg"} width={200} height={200} alt="Doodle" />
      </div>
    </div>
  );
}
