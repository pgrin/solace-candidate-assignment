"use client";

import { useState, useEffect } from "react";
import { fetchFilteredAdvocates } from "../lib/advocates";

export default function AdvocateTable({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching advocates...");
      const advocatesData = await fetchFilteredAdvocates(query, page);
      setAdvocates(advocatesData);
    };
    fetchData();
  }, [page, query]);

  return (
    <div>
      {advocates.length === 0 ? (
        <div>No advocates found</div>
      ) : (
        <div className="rounded-xl border shadow overflow-hidden">
          {/* Headers */}
          <div
            className="grid grid-cols-7 bg-gray-100 text-sm font-semibold text-gray-700 px-4 py-3 gap-4"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 3fr 0.5fr 1fr" }}
          >
            <div>First Name</div>
            <div>Last Name</div>
            <div>City</div>
            <div>Degree</div>
            <div>Specialties</div>
            <div>Experience</div>
            <div>Phone</div>
          </div>

          {/* Rows */}
          {advocates.map((advocate: Advocate, index: number) => (
            <div
              key={advocate.id}
              className={`grid grid-cols-7 px-4 py-3 text-sm gap-4 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 3fr 0.5fr 1fr" }}
            >
              <div>{advocate.firstName}</div>
              <div>{advocate.lastName}</div>
              <div>{advocate.city}</div>
              <div>{advocate.degree}</div>
              <div>
                {advocate.specialties.map((specialty) => (
                  <div key={specialty}>{specialty}</div>
                ))}
              </div>
              <div>{advocate.yearsOfExperience}</div>
              <div>
                {advocate.phoneNumber
                  .toString()
                  .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
