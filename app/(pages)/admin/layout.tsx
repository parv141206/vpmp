import Dashboard from "@/app/_components/Dashboard";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="flex w-full">
      <div>
        <Dashboard />
      </div>
      {children}
    </div>
  );
}
