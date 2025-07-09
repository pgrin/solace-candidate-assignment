import { sql } from "drizzle-orm";
import { advocates } from "./schema";

export const advocatesWhereClause = (query: string) => {
  return sql`
    ${advocates.firstName} ILIKE ${`%${query}%`} OR
    ${advocates.lastName} ILIKE ${`%${query}%`} OR
    ${advocates.city} ILIKE ${`%${query}%`} OR
    ${advocates.degree} ILIKE ${`%${query}%`} OR
    ${advocates.specialties}::text ILIKE ${`%${query}%`}
    `;
};
