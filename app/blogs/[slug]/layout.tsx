import { MongoClient, ObjectId } from "mongodb";
import type { Metadata } from "next";

// Helper function to fetch blog
async function getBlogById(id: string) {
  const url = process.env.MONGO_URL?.toString();
  const dbName = process.env.MONGO_DATABASE?.toString();
  if (!url || !dbName) throw new Error("Mongo env not set");

  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(dbName);
  const blogs = db.collection("blogs");
  const blog = await blogs.findOne({ _id: new ObjectId(id) });

  await client.close();
  return blog;
}

// ✅ SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // 👈 Promise type
}): Promise<Metadata> {
  const { slug } = await params;      // 👈 await karna mandatory

  const blog = await getBlogById(slug);

  if (!blog) {
    return {
      title: "Blog not found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`, // 👈 ab safe
      images: blog.imageUrl ? [{ url: blog.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.imageUrl ? [blog.imageUrl] : [],
    },
  };
}

// ✅ Layout wrapper
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}
