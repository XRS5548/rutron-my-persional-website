import { MongoClient, ObjectId } from "mongodb"

const url = process.env.MONGO_URL as string
const dbName = process.env.MONGO_DATABASE as string

if (!url || !dbName) {
  throw new Error("Mongo env not set")
}

export async function getBlogById(id: string) {
  const client = new MongoClient(url)
  await client.connect()
  const db = client.db(dbName)
  const blogs = db.collection("blogs")

  const blog = await blogs.findOne({ _id: new ObjectId(id) })
  await client.close()
  return blog
}
