import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbyb9nehk/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "mainpreset";

export async function POST(request: NextRequest) {
  const url = process.env.MONGO_URL?.toString();
  if (!url)
    return NextResponse.json({ error: "Environment variables not set" }, { status: 500 });

  const client = new MongoClient(url);

  try {
    await client.connect();
    const database = process.env.MONGO_DATABASE?.toString();
    if (!database)
      return NextResponse.json({ error: "Environment variables not set" }, { status: 500 });

    const db = client.db(database);
    const blogs = db.collection("blogs");

    // request se form data nikaalo
    const formData = await request.formData();

    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const tags = formData.get("tags")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const imageFile = formData.get("image") as File | null;

    let imageUrl = "";

    // Agar image hai to Cloudinary pe upload karo
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const cloudForm = new FormData();
      cloudForm.append("file", new Blob([buffer]));
      cloudForm.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const uploadRes = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: cloudForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        console.error("Cloudinary upload failed:", uploadData);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }

      imageUrl = uploadData.secure_url;
    }

    // database me save karne ke liye object banao
    const blogDoc = {
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
      content,
      imageUrl,
      uploadDate: new Date(),
    };

    const result = await blogs.insertOne(blogDoc);

    return NextResponse.json({
      success: true,
      blogId: result.insertedId,
      blog: blogDoc,
    });
  } catch (error) {
    console.error("Error inserting blog:", error);
    return NextResponse.json({ error: "Failed to insert blog" }, { status: 500 });
  } finally {
    await client.close();
  }
}
