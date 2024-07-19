"use client";
import React, { useEffect, useState } from "react";
import AlumniCard from "./Cards/AlumniCard";
import "./Carousel.css";
import BetterAlumniCard from "./Cards/BetterAlumniCard";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const rawImages = await fetch("/api/db/images");
        if (!rawImages.ok) {
          throw new Error("Failed to fetch images");
        }
        const images = await rawImages.json();
        const ceBranchImages = images.filter(
          (image) => image.branch === "ce" || image.branch === ""
        );
        setImages(ceBranchImages);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500); // Duration of the fade effect
    }, 6000); // Duration between transitions

    return () => clearInterval(interval);
  }, [images.length]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-hidden absolute">
      <div
        className={`carousel-container ${fade ? "fade-out" : "fade-in"}`}
        style={{
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div className="relative h-screen w-screen">
          <div className="absolute z-40 md:right-32 md:left-auto md:rotate-[25deg] -right-3 md:top-20 scale-[0.55] md:scale-90 -top-0 rotate-[-25deg] left-10 ">
            <BetterAlumniCard
              className="w-64"
              name={images[currentIndex]?.name}
              position={images[currentIndex]?.position}
              src={images[currentIndex]?.src}
              company={images[currentIndex]?.company}
              batch={images[currentIndex]?.batch}
            />
          </div>
          <div className="absolute z-40 md:left-32 md:right-auto md:-rotate-[25deg] -left-3 md:top-20 scale-[0.55] md:scale-90 -top-0 rotate-[-25deg] right-10 ">
            <BetterAlumniCard
              className="w-64"
              name={images[(currentIndex + 1) % images.length]?.name}
              position={images[(currentIndex + 1) % images.length]?.position}
              src={images[(currentIndex + 1) % images.length]?.src}
              company={images[currentIndex + (1 % images.length)]?.company}
              batch={images[currentIndex + (1 % images.length)]?.batch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
