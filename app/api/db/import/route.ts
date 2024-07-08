import { NextRequest, NextResponse } from "next/server";
import csv from "csvtojson";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const csvData = await req.text();
    const jsonObj = await csv().fromString(csvData);
    console.log(jsonObj);
    if (jsonObj) {
      const client = await MongoClient.connect("mongodb://localhost:27017")
      const db = client.db("vpmp")
      const collection = db.collection("csv")
      const result = collection.insertMany(jsonObj);
      console.log(result)
    }
    return NextResponse.json({ message: "CSV data processed successfully" });
  } catch (error) {
    console.error("Error processing CSV data:", error);
    return NextResponse.json({ message: "Error processing CSV data" }, { status: 500 });
  }
}
