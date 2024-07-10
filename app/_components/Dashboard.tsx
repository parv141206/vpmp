"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  return (
    < div className="rounded shadow-lg bg-sky-100 w-fit sticky top-16 h-fit p-6" >
      <h2 className="text-lg font-bold ">Dashboard</h2>
      <nav>
        <ul className="space-y-1 divide-y divide-gray-400 ">
          <li>
            <Link
              href="/admin/"
              className="block hover:bg-gray-200 px-2 py-2 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/admin/upload"
              className="block hover:bg-gray-200 px-2 py-2 rounded"
            >
              Upload Alumni
            </Link>
          </li>

          <li>
            <Link
              href="/admin/verify"
              className="block hover:bg-gray-200 px-2 py-2 rounded"
            >
              Requests
            </Link>
          </li>
          <button onClick={() => { signOut(); }} className="p-3 bg-sky-300">Sign Out</button>
        </ul>
      </nav>
    </div >
  );
}
