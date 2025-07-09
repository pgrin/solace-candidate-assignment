"use client";

import { useState, useEffect } from "react";
import { fetchFilteredAdvocates } from "../lib/advocates";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AdvocateTable({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  let sortField = params.get("sort") || "createdAt";
  let sortDirection = params.get("sortdir") || "desc";

  useEffect(() => {
    const fetchData = async () => {
      const advocatesData = await fetchFilteredAdvocates(
        query,
        page,
        sortField,
        sortDirection
      );
      setAdvocates(advocatesData);
    };
    fetchData();
  }, [page, query, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortField = field;
      sortDirection = "asc";
    }

    params.set("sort", sortField);
    params.set("sortdir", sortDirection);
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {advocates.length === 0 ? (
        <div>No advocates found</div>
      ) : (
        <div className="rounded-xl border shadow overflow-hidden">
          <div
            className="grid grid-cols-7 bg-gray-100 text-sm font-semibold text-gray-700 px-4 py-3 gap-4"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 3fr 0.5fr 1fr" }}
          >
            <div
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleSort("firstName")}
            >
              First Name
              {sortField === "firstName" && (
                <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </div>
            <div
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleSort("lastName")}
            >
              Last Name
              {sortField === "lastName" && (
                <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </div>
            <div
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleSort("city")}
            >
              City
              {sortField === "city" && (
                <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </div>
            <div
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleSort("degree")}
            >
              Degree
              {sortField === "degree" && (
                <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </div>
            <div>Specialties</div>
            <div
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleSort("experience")}
            >
              Experience
              {sortField === "experience" && (
                <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </div>
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
