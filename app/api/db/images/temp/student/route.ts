
import { Binary, MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const client = new MongoClient("mongodb://localhost:27017");

export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("vpmp");
    const branches = ["ce", "me", "ee", "ec", "civil"];
    const studentData = {};

    for (const branch of branches) {
      const collection = db.collection("students");
      const data = await collection.find({ branch }).toArray();

      studentData[branch] = data.map((student) => ({
        id: student._id.toString(),
        src: `data:image/jpeg;base64,${student.image.toString("base64")}`,
        name: student.name,
        college: student.college,
        batch: student.batch,
      }));
    }

    await client.close();

    if (Object.keys(studentData).length > 0) {
      return new NextResponse(JSON.stringify(studentData));
    } else {
      return new NextResponse(JSON.stringify({ error: "No student data found" }), {
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
    const college = formData.get("college");
    const branch = formData.get("branch");

    if (imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const binaryData = new Binary(buffer);

      await client.connect();

      const db = client.db("vpmp");
      const collection = db.collection("students");

      const res = await collection.insertOne({
        branch,
        name,
        batch,
        college,
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
    const collection = db.collection("students");
    const student = await collection.findOne({ _id: id });

    if (student) {
      await collection.deleteOne({ _id: id });
      return new NextResponse(JSON.stringify({message: "Works"}), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Student data not found" }), {
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
