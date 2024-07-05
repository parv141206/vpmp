import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="">
      <div className="flex">
        {/* Sidebar */}
        <div className="rounded shadow-lg w-60 p-6">
          <h2 className="text-lg font-bold mb-4">Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/"
                  className="block hover:bg-gray-200 px-2 py-2 rounded"
                >
                  Home
                  <hr className="p-2 border-black" />
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/upload"
                  className="block hover:bg-gray-200 px-2 py-2 rounded"
                >
                  Upload Alumni
                  <hr className="p-2 border-black" />
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/verify"
                  className="block hover:bg-gray-200 px-2 py-2 rounded"
                >
                  Requests
                  <hr className="p-2 border-black" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
