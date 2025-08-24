import { MongoClient, ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import BlogContent from "@/app/blogs/[slug]/BlogContent"; // 👈 client component

// Mongo connection helper (Server)
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ params ko await karna zaroori hai


  let blog;
  try {
    blog = await getBlogById(slug);
  } catch (err) {
    console.error(err);
    return notFound();
  }
  if (!blog) return notFound();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] overflow-hidden">
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-200 text-sm mb-2">
            {new Date(blog.uploadDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-lg text-gray-100 max-w-2xl">{blog.description}</p>
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="max-w-7xl mx-auto p-6">
        <BlogContent html={blog.content} />

        {/* Tags */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold">Tags:</h3>
            <div className="flex gap-2 flex-wrap mt-2">
              {blog.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 text-black text-lg rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
