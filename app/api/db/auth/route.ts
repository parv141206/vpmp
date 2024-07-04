import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import * as CryptoJS from "crypto-js";

export async function POST(req: NextRequest) {
  const client = await MongoClient.connect("mongodb://localhost:27017");

  const body = await req.json();

  // Check if the ENCRYPTION_KEY environment variable is set
  if (!process.env.ENCRYPTION_KEY) {
    await client.close();
    return NextResponse.json(
      { error: "ENCRYPTION_KEY is not set" },
      { status: 500 }
    );
  }

  const db = client.db("vpmp");
  const collection = db.collection("admins");
  const admin = await collection.findOne({
    username: body.username,
  });

  if (admin) {
    try {
      // Decrypt the password
      const bytes = CryptoJS.AES.decrypt(
        admin.password,
        process.env.ENCRYPTION_KEY
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      // Check if decryption is successful
      if (!decryptedPassword) {
        throw new Error("Decryption failed, resulting in an empty string");
      }

      // Compare the decrypted password with the provided password
      if (decryptedPassword === body.password) {
        await client.close();
        return NextResponse.json(admin);
      } else {
        await client.close();
        return NextResponse.json(
          { message: "Invalid username or password" },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error("Error decrypting password:", error.message);
      await client.close();
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    await client.close();
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }
}
