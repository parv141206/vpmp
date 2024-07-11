"use client";
import OurAlumniCard from "@/app/_components/Cards/OurAlumniCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function RenderStudents() {
  const [students, setStudents] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/db/images/temp/student");
        if (response.ok) {
          const res = await response.json();
          setStudents(res);
        } else {
          console.error("Error fetching student data:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudents();
  }, []);
  const deleteStudent = async (id) => {
    try {
      const response = await fetch("/api/db/images/temp/student", {
        method: "DELETE",
        body: JSON.stringify({ id: id })
      })
      console.log(response)
        try {
        const response = await fetch("/api/db/images/temp/student");
        if (response.ok) {
          const res = await response.json();
          setStudents(res);
        } else {
          console.error("Error fetching student data:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }

    } catch (error) {
      console.error("Error fetching student data:", error);
    }


  }
  return (
    <div className="container mx-auto relative p-5">

      {Object.keys(students).map((branch) => (
        <div key={branch} className="mb-10 flex items-center justify-center flex-col">
          <div className="w-2/3">
            <h1 className="my-5 font-unkempt text-xl md:text-start text-center font-bold">
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
          <div className="flex p-5 w-full flex-col">
            <div className="grid grid-cols-1  place-items-stretch place-content-center md:grid-cols-3 gap-5">
              {students[branch].length === 0 ? <div>No data found</div> : students[branch].map((student) => (
                <OurAlumniCard
                  key={student.id}
                  name={student.name}
                  position={student.batch}
                  src={student.src}
                  company={student.college} // Pass college as company
                  className="shadow-md p-5"
                >
                  <button onClick={() => { deleteStudent(student.id) }} className="delete">Delete</button>
                </OurAlumniCard>
              ))
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
