import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db("vpmp");

  // Retrieve data from the 'ce' collection
  const ceCollection = db.collection("ce");
  const ceData = await ceCollection.find({}).toArray();

  // Retrieve data from the 'me' collection
  const meCollection = db.collection("me");
  const meData = await meCollection.find({}).toArray();

  // Retrieve data from the 'ee' collection
  const eeCollection = db.collection("ee");
  const eeData = await eeCollection.find({}).toArray();

  // Retrieve data from the 'ec' collection
  const ecCollection = db.collection("ec");
  const ecData = await ecCollection.find({}).toArray();

  // Retrieve data from the 'civil' collection
  const civilCollection = db.collection("civil");
  const civilData = await civilCollection.find({}).toArray();

  // Retrieve data from the 'students' collection
  const studentsCollection = db.collection("students");
  const studentsData = await studentsCollection.find({}).toArray();

  // Prepare the response
  const response = {
    ce: ceData,
    me: meData,
    ee: eeData,
    ec: ecData,
    civil: civilData,
    students: studentsData,
  };

  await client.close();
  return NextResponse.json(response);
}
