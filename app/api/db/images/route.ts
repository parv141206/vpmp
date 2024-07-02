import { MongoClient, Binary } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const client = new MongoClient("mongodb://localhost:27017");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    const name = formData.get("name");
    const batch = formData.get("batch");
    const position = formData.get("position");
    const company = formData.get("company");

    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const binaryData = new Binary(buffer);

      await client.connect();
      const db = client.db("vpmp");
      const collection = db.collection("images");
      const res = await collection.insertOne({
        name,
        batch,
        position,
        company,
        image: binaryData,
      });
      await client.close();
      return new NextResponse(JSON.stringify(res));
    } else {
      return new NextResponse(JSON.stringify({ error: "No image provided" }), {
        status: 400,
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("vpmp");
    const collection = db.collection("images");
    const res = await collection.find({}).toArray();
    await client.close();

    if (res.length > 0) {
      const imageData = res.map((image) => ({
        id: image._id,
        name: image.name,
        batch: image.batch,
        company: image.company,
        position: image.position,
        src: `data:image/jpeg;base64,${image.image.toString("base64")}`,
      }));
      return new NextResponse(JSON.stringify(imageData));
    } else {
      return new NextResponse(JSON.stringify({ error: "No images found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
