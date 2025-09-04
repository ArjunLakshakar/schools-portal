import { connectToDatabase } from "../../../../lib/db";
import { writeFile, mkdir } from "fs/promises";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image"); // File | null

    // Ensure folder exists
    const imagesDir = path.join(process.cwd(), "public", "schoolImages");
    if (!fs.existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    // Save image (if provided)
    let imagePath = "";
    if (imageFile && typeof imageFile === "object" && "arrayBuffer" in imageFile) {
      const ext = path.extname(imageFile.name || "").toLowerCase() || ".png";
      const fileName = `${Date.now()}${ext}`;
      const diskPath = path.join(imagesDir, fileName);

      const bytes = await imageFile.arrayBuffer();
      await writeFile(diskPath, Buffer.from(bytes)); // write to /public/schoolImages/...

      imagePath = `/schoolImages/${fileName}`; // public URL to store in DB
    }

    // Insert row
    const db = await connectToDatabase();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return Response.json({ message: "✅ School added successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error inserting school:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
