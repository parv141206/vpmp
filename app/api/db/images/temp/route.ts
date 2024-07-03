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
    const branch = formData.get("branch"); // added branch to formData
    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const binaryData = new Binary(buffer);

      await client.connect();

      const db = client.db("vpmp");
      let collection = db.collection("temp");
      console.log(branch);

      console.log(collection);
      const res = await collection.insertOne({
        branch,
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
