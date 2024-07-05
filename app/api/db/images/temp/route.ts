import { Binary, MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const client = new MongoClient("mongodb://localhost:27017");

export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("vpmp");
    const branches = ["ce", "me", "ee", "ec", "civil"];
    const imageData = {};

    for (const branch of branches) {
      const collection = db.collection("temp");
      const data = await collection.find({ branch }).toArray();

      imageData[branch] = data.map((image) => ({
        id: image._id.toString(),
        src: `data:image/jpeg;base64,${image.image.toString("base64")}`,
        name: image.name,
        position: image.position,
      }));
    }

    await client.close();

    if (Object.keys(imageData).length > 0) {
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
export async function DELETE(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("vpmp");
    const body = await req.json();
    const id = new ObjectId(body.id);
    const branch = body.branch;
    let collection = db.collection("temp");
    const image = await collection.findOne({ _id: id });

    if (image) {
      if (branch === "") {
        collection = db.collection("ce");
      } else {
        collection = db.collection(branch);
      }
      const res = await collection.insertOne(image);
      // removing the image from temp
      collection = db.collection("temp");
      await collection.deleteOne({ _id: id });
      return new NextResponse(JSON.stringify(res), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Image not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
