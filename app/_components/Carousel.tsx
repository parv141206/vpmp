"use client";
import React, { useEffect, useState } from "react";
import AlumniCard from "./Cards/AlumniCard";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const rawImages = await fetch("/api/db/images");
        if (!rawImages.ok) {
          throw new Error("Failed to fetch images");
        }
        const images = await rawImages.json();
        setImages(images);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-hidden absolute">
      <div
        style={{
          transition: "transform 1s ease-in-out",
          transform: `translateX(-${currentIndex * 100}vw)`,
        }}
        className={`mx-auto overflow-x-scroll w-[${
          images.length * 100
        }vw] flex items-center justify-center`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-screen w-screen"
            style={{ width: "100vw" }}
          >
            <div className="absolute z-40 md:right-36 md:left-auto md:rotate-[25deg] -right-3 md:top-12 scale-[0.45] md:scale-90 -top-0 rotate-[-25deg] left-10">
              <AlumniCard
                name={images[index].name}
                position={images[index].position}
                src={images[index].src}
              />
            </div>
            <div className=" z-40 absolute md:left-36 -left-3 md:right-auto md:rotate-[-25deg] scale-[0.55] md:scale-[0.8] md:top-12 -top-12 w-fit rotate-[25deg] right-10">
              <AlumniCard
                name={images[index + 1]?.name}
                position={images[index + 1]?.position}
                src={images[index + 1]?.src}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
