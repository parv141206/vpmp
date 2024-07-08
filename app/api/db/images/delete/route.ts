import { Binary, MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const client = new MongoClient("mongodb://localhost:27017");

export async function DELETE(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("vpmp");
    const body = await req.json();
    const id = new ObjectId(body.id);

    // removing the image from temp
    const collection = db.collection("temp");
    await collection.deleteOne({ _id: id });
    return new NextResponse(JSON.stringify({ message: "deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
