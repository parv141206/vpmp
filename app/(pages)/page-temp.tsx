"use client";
import Image from "next/image";
import AlumniCard from "../_components/Cards/AlumniCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [base64String, setBase64String] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/db/images")
      .then((res) => res.json())
      .then((res) => {
        const imageData = res.image.data;

        // Check if imageData is a Uint8Array and convert to Base64 string
        if (imageData && imageData.length) {
          const base64String = `data:image/jpeg;base64,${Buffer.from(
            imageData
          ).toString("base64")}`;
          setBase64String(base64String);
        } else {
          console.error("Image data is not in expected format or is empty");
        }
      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
      });
  }, []);

  return (
    <>
      <AlumniCard />
      {base64String ? (
        <img src={base64String} alt="Fetched Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </>
  );
}
