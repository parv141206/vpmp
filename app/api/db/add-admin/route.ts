import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import * as CryptoJS from "crypto-js";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Check if the ENCRYPTION_KEY environment variable is set
  if (!process.env.ENCRYPTION_KEY) {
    return NextResponse.json(
      { error: "ENCRYPTION_KEY is not set" },
      { status: 500 }
    );
  }

  // Encrypt the password using CryptoJS
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.ENCRYPTION_KEY
  ).toString();

  const client = await MongoClient.connect("mongodb://localhost:27017");

  const db = client.db("vpmp");

  const collection = db.collection("admins");

  const result = await collection.insertOne({
    username,
    password: encryptedPassword,
  });

  await client.close();

  return NextResponse.json(result);
}
