"use client";
import { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          placeholder="name"
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <input
          placeholder="batch"
          type="text"
          name="batch"
          value={batch}
          onChange={handleInputChange}
        />
        <input
          placeholder="position"
          type="text"
          name="position"
          value={position}
          onChange={handleInputChange}
        />
        <input
          placeholder="company"
          type="text"
          name="company"
          value={company}
          onChange={handleInputChange}
        />
        <select name="branch" value={branch} onChange={handleInputChange}>
          <option value="ce">CE</option>
          <option value="me">ME</option>
          <option value="ec">EC</option>
          <option value="ee">EE</option>
          <option value="civil">Civil</option>
        </select>
        <button type="submit">Upload Image</button>
      </form>
      <button onClick={fetchImages}>Fetch Images</button>
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.src} alt={`Image ${image.id}`} />
        ))}
      </div>
    </>
  );
}
