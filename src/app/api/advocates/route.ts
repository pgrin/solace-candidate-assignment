import { advocates } from "@/db/schema";
import db from "@/db/index";
import { MAX_ITEMS_PER_PAGE } from "@/constants";
import { advocatesWhereClause } from "@/db/query";
import { desc, asc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "";
  const sortdir = searchParams.get("sortdir") || "";

  const offset = (page - 1) * MAX_ITEMS_PER_PAGE;

  const whereClause =
    query.trim().length > 0 ? advocatesWhereClause(query) : undefined;

  const sortColumnMap = {
    firstName: advocates.firstName,
    lastName: advocates.lastName,
    city: advocates.city,
    degree: advocates.degree,
    experience: advocates.yearsOfExperience,
    createdAt: advocates.createdAt,
  };

  const sortColumn = sortColumnMap[sort as keyof typeof sortColumnMap];

  // Fallback if invalid sort key
  const orderByClause =
    sortdir === "desc" ? desc(sortColumn as any) : asc(sortColumn as any);
  try {
    const data = await (db as any)
      .select()
      .from(advocates)
      .where(whereClause)
      .limit(MAX_ITEMS_PER_PAGE)
      .offset(offset)
      .orderBy(orderByClause);

    return Response.json({ data });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to get advocates.");
  }
}
