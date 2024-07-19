import React from "react";
import { MdError } from "react-icons/md";

export default function Error({ error }: { error: string }) {
  return (
    <div className="bg-red-600 text-white rounded-md p-3  flex items-center gap-3">
      <MdError className="text-3xl" />
      <div>{error}</div>
    </div>
  );
}
