import React, { ReactNode } from 'react'

export default function FeaturedCard({ title, content, date, children }: { title: string, content: string, date: string, children?: ReactNode }) {
  return (
    <div>
      <div className="rounded-2xl shadow-gray-200 bg-gray-800 text-white shadow-xl p-5">
        <div className="text-3xl font-bold">{title}</div>
        <div className="m-3 p-3 border-s border-blue-200">{content}</div>
        <div className="text-sm text-gray-400">{date}</div>
        {children}
      </div>
   
    </div>
  )
}

