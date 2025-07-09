import { MAX_ITEMS_PER_PAGE } from "@/constants";

export async function fetchFilteredAdvocates(
  query: string,
  page: number,
  sortField: string = "createdAt",
  sortDirection: string = "desc"
): Promise<Advocate[]> {
  try {
    let fetchUrl = `/api/advocates?query=${query}&page=${page}&sort=${sortField}&sortdir=${sortDirection}`;

    const response = await fetch(fetchUrl);
    const jsonResponse = await response.json();

    return jsonResponse.data as Advocate[];
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch advocates.");
  }
}

export async function fetchFilteredAdvocatesPages(
  query: string
): Promise<number> {
  try {
    const response = await fetch(`/api/advocates/count?query=${query}`);
    const jsonResponse = await response.json();

    if (!jsonResponse.data || jsonResponse.data.length === 0)
      throw new Error("No empty results.");

    const count = jsonResponse.data[0].count;

    const totalPages = Math.ceil(Number(count) / MAX_ITEMS_PER_PAGE) || 1;
    return totalPages;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch total number of advocates.");
  }
}
