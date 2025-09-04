import { connectToDatabase } from "../../../../lib/db";

export async function GET() {
  try {
    const db = await connectToDatabase();

    // Fetch only required fields (not all columns)
    const [rows] = await db.query(
      "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC"
    );

    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching schools:", error);
    return Response.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}
