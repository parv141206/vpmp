"use client"
import FeaturedCard from '@/app/_components/Cards/FeaturedCard';
import React, { useEffect, useState } from 'react'

export default function Featured() {
  const [featuredArticles, setFeaturedArticles] = useState([])

  useEffect(() => {
    fetchArticles();
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/db/featured");
      const articles = await response.json();
      setFeaturedArticles(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  return (
    <div className="p-5 flex flex-col justify-start items-start gap-5">
      <div className="text-5xl">Featured Stories</div>
      <div className="grid grid-cols-3 gap-3">
        {
          featuredArticles.map((article) => {
            const date = new Date(article.date);
            const formattedDate = date.toLocaleDateString('en-GB');
            return (
              <FeaturedCard key={article._id} title={article.title} content={article.content} date={formattedDate} />
            );
          })
        }
      </div>
    </div>
  )
}
