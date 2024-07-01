import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Binary } from "mongodb";
import fs from "fs";
import { Buffer } from "buffer";

export async function POST(req: NextRequest) {
  const filePath = "mountains.jpg";
  const imageData = fs.readFileSync(filePath);
  const base64String = imageData.toString("base64");
  const buffer = Buffer.from(base64String, "base64");
  const binaryData = new Binary(buffer);
  const client = new MongoClient("mongodb://localhost:27017");
  const db = client.db("vpmp");
  const collection = db.collection("images");
  const r = await req.json();
  const res = await collection.insertOne({
    name: r.name,
    batch: r.batch,
    position: r.position,
    company: r.company,
    image: binaryData,
  });
  return new NextResponse(JSON.stringify(res));
}

export async function GET(req: NextRequest) {
  const client = new MongoClient("mongodb://localhost:27017");
  const db = client.db("vpmp");
  const collection = db.collection("images");
  const res = await collection.find({}).toArray();
  const imageData = res[0].image.buffer;
  const response = new NextResponse(imageData);
  response.headers.set("Content-Type", "image/jpeg");
  return new NextResponse(JSON.stringify({ res, image: imageData }));
}
