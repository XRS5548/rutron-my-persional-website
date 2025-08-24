import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
export async function GET(request: NextRequest) {
    const url = process.env.MONGO_URL?.toString()
    if (!url) return NextResponse.json({ "Error": "Environment variables not seted" })
    const client = new MongoClient(url);
    try {
        client.connect()
        const database = process.env.MONGO_DATABASE?.toString()
        if (!database) return NextResponse.json({ "Error": "Environment variables not seted" })
        const db = client.db(database)
        const blogs = db.collection('blogs')
        const allblogs = blogs.find()
        return NextResponse.json({ "Blogs": allblogs.toArray() })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ "msg": "Failed" })

    }
}