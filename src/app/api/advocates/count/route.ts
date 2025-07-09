import { sql } from "drizzle-orm";
import { advocates } from "@/db/schema";
import db from "@/db/index";
import { advocatesWhereClause } from "@/db/query";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  const whereClause =
    query.trim().length > 0 ? advocatesWhereClause(query) : undefined;

  try {
    const data = await (db as any)
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(advocates)
      .where(whereClause);

    return Response.json({ data });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to get advocates count.");
  }
}
