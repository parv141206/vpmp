"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/db/analyze");
      const res = await response.json();
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <div>
      {Object.entries(data).map(([branch, values]: any) => {
        values.sort((a, b) => parseInt(a.batch) - parseInt(b.batch));
        return (
          <div key={branch} className="p-5">
            <h2 className="text-3xl font-bold">{branch}</h2>
            <table className="table">
              <thead className="">
                <tr>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Batch</th>
                  <th>Company</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {values.map((alumni, index) => (
                  <tr key={index}>
                    <td>{alumni.name}</td>
                    <td>{alumni.branch}</td>
                    <td>{alumni.batch}</td>
                    <td>{alumni.company}</td>
                    <td>{alumni.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
