import { MongoClient, ObjectId, Binary } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, ...rest } = body;
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = client.db("vpmp");
  const branches = ["ce", "me", "ee", "ec", "civil"];

  const promises = branches.map(async (branch) => {
    const collection = db.collection(branch);
    const result = await collection.findOne({ eno: id });
    return result !== null;
  });

  const results = await Promise.all(promises);
  const found = results.some((result) => result);

  if (!found) {
    return NextResponse.json({ message: "failed" });
  } else {
    return NextResponse.json({ message: "success" });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    const name = formData.get("name");
    const batch = formData.get("batch");
    const position = formData.get("position");
    const company = formData.get("company");
    const branch: any = formData.get("branch"); // added branch to formData
    const eno = formData.get("eno");

    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const binaryData = new Binary(buffer);
      console.log(binaryData);
      const client = await MongoClient.connect("mongodb://localhost:27017");
      const db = client.db("vpmp");
      const collection = db.collection(branch);
      const res = await collection.deleteOne({
        eno: formData.get("eno"),
      });

      const res2 = await collection.insertOne({
        eno,
        email: formData.get("email"),
        branch,
        name,
        batch,
        position,
        company,
        image: binaryData,
      });
      //  await client.close();
      return new NextResponse(JSON.stringify({ message: "success" }), {});
    } else {
      return new NextResponse(JSON.stringify({ error: "No image provided" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
