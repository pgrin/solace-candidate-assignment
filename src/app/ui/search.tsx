"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query")?.toString() || ""
  );

  const handleSearchInputChange = (term: string) => {
    setSearchTerm(term);
    updateSearchParams(term);
  };

  const handleResetClick = () => {
    setSearchTerm("");
    updateSearchParams("");
  };

  // Debounce the update of the search params to avoid multiple re-renders
  const updateSearchParams = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term.trim());
      params.set("page", "1");
    } else {
      params.delete("query");
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="w-full max-w-xl mx-auto rounded-lg bg-white shadow-md p-6 space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search for an advocate..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          onChange={(e) => handleSearchInputChange(e.target.value)}
          value={searchTerm}
        />
        <button
          onClick={handleResetClick}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
