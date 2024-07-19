"use client";
import FeaturedCard from "@/app/_components/Cards/FeaturedCard";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/db/featured");
      const articles = await response.json();
      setFeaturedArticles(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/db/featured", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, date }),
      });
      if (response.ok) {
        alert("Article added successfully!");
        setTitle("");
        setContent("");
        setDate(new Date().toISOString().slice(0, 10));
        fetchArticles();
      } else {
        alert("Error adding article. Please try again.");
      }
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Error adding article. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/db/featured`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        alert("Article deleted successfully!");
        fetchArticles();
      } else {
        alert("Error deleting article. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article. Please try again.");
    }
  };
  return (
    <div className="p-5 flex flex-col justify-start items-start gap-5">
      <div className="text-5xl">Add a new article...</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded-md p-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Article
        </button>
      </form>
      <div className="text-5xl">Articles...</div>
      <div className="grid grid-cols-3 gap-3">
        {featuredArticles.map((article) => {
          const date = new Date(article.date);
          const formattedDate = date.toLocaleDateString("en-GB");
          return (
            <FeaturedCard
              key={article._id}
              title={article.title}
              content={article.content}
              date={formattedDate}
            >
              <button
                className="delete"
                onClick={() => handleDelete(article._id)}
              >
                Delete
              </button>
            </FeaturedCard>
          );
        })}
      </div>
    </div>
  );
}
