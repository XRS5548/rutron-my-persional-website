import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Always give base URL, because req.url might be relative in Next.js
  const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 100; // fixed limit

  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();
  const db = client.db(process.env.MONGO_DATABASE);

  const blogs = await db
    .collection("blogs")
    .find({})
    .sort({ createdAt: -1 }) // latest first
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const total = await db.collection("blogs").countDocuments();

  await client.close();

  return NextResponse.json({
    blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
