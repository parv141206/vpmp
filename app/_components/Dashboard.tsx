import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-white shadow-lg w-64 p-6">
          <h2 className="text-lg font-bold mb-4">Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/dashboard"
                  className="block hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/upload"
                  className="block hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Upload Alumni
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/fetch"
                  className="block hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Fetch Alumni
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/verify"
                  className="block hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Requests
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
