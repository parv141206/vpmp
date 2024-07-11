import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("vpmp");
  const collection = db.collection("featured");
  const featuredArticles = await collection
    .find({})
    .sort({ date: -1 })
    .toArray();
  return NextResponse.json(featuredArticles);
}

export async function POST(req: NextRequest) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("vpmp");
  const collection = db.collection("featured");

  const { title, content, date } = await req.json();

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const newArticle = {
    title,
    content,
    date: formattedDate,
  };

  const result = await collection.insertOne(newArticle);

  return NextResponse.json({ id: result.insertedId });
}

export async function DELETE(req: NextRequest) {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("vpmp");
  const collection = db.collection("featured");

  const { id } = await req.json();

  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 1) {
    return NextResponse.json({ message: 'Article deleted successfully' });
  } else {
    return NextResponse.json({ message: 'Error deleting article' }, { status: 500 });
  }
}
