"use client";

import Search from "./ui/search";
import AdvocateTable from "./ui/advocate-table";
import Pagination from "./ui/pagination";
import { fetchFilteredAdvocatesPages } from "./lib/advocates";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const advocatesPages = await fetchFilteredAdvocatesPages(query);
      setTotalPages(advocatesPages);
    };
    fetchData();
  }, [page, query]);

  return (
    <main style={{ margin: "24px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#285e50] text-white p-4 mb-6">
          <div className="flex items-center gap-4">
            <Image src="/solace.svg" width={96} height={96} alt="solace logo" />
          </div>
        </div>
        <div>
          <Search />
        </div>
        <Pagination totalPages={totalPages} />
        <AdvocateTable query={query} page={page} />
      </div>
    </main>
  );
}
