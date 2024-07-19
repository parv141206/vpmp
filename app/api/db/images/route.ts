import { MongoClient, Binary, ObjectId } from "mongodb";
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
      let collection = db.collection("ce");
      // console.log(branch);
      if (branch === "ce") {
        // console.log("cdcdc");
        collection = db.collection("ce");
      } else if (branch === "me") {
        collection = db.collection("me");
      } else if (branch === "ee") {
        collection = db.collection("ee");
      } else if (branch === "ec") {
        collection = db.collection("ec");
      } else if (branch === "civil") {
        collection = db.collection("civil");
      } else {
        collection = db.collection("ce");
      }
      // console.log(collection);
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
export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("vpmp");
    const branches = ["ce", "me", "ee", "ec", "civil"];
    const imageData = [];

    for (const branch of branches) {
      const collection = db.collection(branch);
      const res = await collection.find({}).toArray();
      // console.log(res);
      imageData.push(
        ...res.map((image) => ({
          id: image._id,
          name: image.name,
          batch: image.batch,
          company: image.company,
          position: image.position,
          src: `data:image/jpeg;base64,${image.image.toString("base64")}`,
          branch,
          eno: image.eno,
        }))
      );
    }

    await client.close();

    if (imageData.length > 0) {
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
export async function DELETE(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("vpmp");
    const body = await req.json();
    console.log(
      ">|||||||||||||||||||||||||||||||||||||||||||||||||>>>>>>>>>>>",
      body
    );
    const id = new ObjectId(body.id);
    const branch = body.branch;
    const collection = db.collection(branch);
    console.log(id);
    const res = await collection.deleteOne({ _id: id });
    await client.close();
    return new NextResponse(JSON.stringify({ message: "deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
