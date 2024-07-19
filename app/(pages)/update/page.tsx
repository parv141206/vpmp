"use client";
import Error from "@/app/_components/Error";
import Form from "@/app/_components/Form";
import UpdateForm from "@/app/_components/UpdateForm";
import sendEmail from "@/app/_utils/email";
import React, { useState } from "react";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userEnteredOtp, setUserEnteredOtp] = useState("");
  const [errors, setErrors] = useState({
    enrollmentNumber: "",
    otp: "",
  });
  const validateEnrollmentNumber = async () => {
    if (enrollmentNumber.length !== 12) {
      setErrors((prev) => ({
        ...prev,
        enrollmentNumber: "Invalid enrollment number",
      }));
      console.log(errors);
      return false;
    } else {
      const response = await fetch("/api/db/images/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: enrollmentNumber,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "success") {
        setCurrentStep(2);
      } else {
        setErrors((prev) => ({
          ...prev,
          enrollmentNumber:
            "Your enrollment number doesn't exist. Make sure its correctly typed and try again...",
        }));
      }
    }

    return true;
  };
  const sendOTP = async () => {
    const randomOTP = Math.floor(100000 + Math.random() * 900000);
    setOtp(randomOTP.toString());
    sendEmail(email, randomOTP);

    setCurrentStep(3);
  };
  const verifyOTP = () => {
    if (otp === userEnteredOtp) {
      setCurrentStep(4);
    } else {
      setErrors((prev) => ({
        ...prev,
        otp: "Invalid OTP",
      }));
    }
  };
  return (
    <div>
      <div className="container mx-auto m-3 ">
        <div className="text-3xl md:w-1/2">
          Hello! If you have any changes regarding your name, company, position
          etc, you can update it here...
        </div>
        <div className="text-xl text-gray-800">
          Just fill out the following form, wont take you long!
        </div>
        <div className="m-5 rounded-3xl p-5 border bg-white shadow-md">
          <div className="my-3 flex items-center gap-5">
            {Array.from({ length: currentStep }).map((_, index) => (
              <div key={index} className="rounded-full bg-green-600 w-5 h-5">
                {" "}
              </div>
            ))}
            {Array.from({ length: 5 - currentStep }).map((_, index) => (
              <div key={index} className="rounded-full bg-gray-200 w-5 h-5">
                {" "}
              </div>
            ))}
          </div>
          {currentStep === 1 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl">
                Step 1: Please enter your enrollment number
              </h2>
              <form action="">
                <input
                  type="text"
                  onChange={(e) => setEnrollmentNumber(e.target.value)}
                  placeholder="226540307099"
                />
              </form>
              <button
                className="btn-dark w-fit"
                onClick={() => validateEnrollmentNumber()}
              >
                Submit
              </button>
              {
                <div className="text-red-500">
                  {errors.enrollmentNumber != "" && (
                    <Error error={errors.enrollmentNumber} />
                  )}
                </div>
              }
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl">Step 2: Please enter your email</h2>
              <p>
                For authentication purpose, we will send you an OTP on the email
                which you provide... <br /> Kindly enter it correctly in the
                field below.
              </p>
              <form action="">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                />
              </form>
              <button className="btn-dark w-fit" onClick={() => sendOTP()}>
                Submit
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl">Step 3: Please enter the OTP</h2>
              <p>
                The OTP was sent to your email , {email}. Kindly enter it
                correctly here...
              </p>
              <form action="">
                <input
                  type="text"
                  onChange={(e) => setUserEnteredOtp(e.target.value)}
                  placeholder="000000"
                />
              </form>
              <button className="btn-dark w-fit" onClick={() => verifyOTP()}>
                Submit
              </button>
              {
                <div className="text-red-500">
                  {errors.otp != "" && <Error error={errors.otp} />}
                </div>
              }
            </div>
          )}
          {currentStep === 4 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl">
                Step 1: Please enter your information again, and it will be
                updated...
              </h2>
              <UpdateForm />

              {
                <div className="text-red-500">
                  {errors.enrollmentNumber != "" && (
                    <Error error={errors.enrollmentNumber} />
                  )}
                </div>
              }
            </div>
          )}
          <button onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}
