import Dashboard from "@/app/_components/Dashboard";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="flex relative w-full p-5">
      <Dashboard />
      {children}
    </div>
  );
}
