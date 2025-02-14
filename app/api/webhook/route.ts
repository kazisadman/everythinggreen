/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

interface TWebhookPaylaod {
  eventType: string;
  data: Record<string, any>;
}

interface TStoredData {
  eventType: string;
  data: Record<string, any>;
  timestamp: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const signature = request.headers.get("x-signature") as string;
    
    if (!signature) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Missing signature" }),
        { status: 404 }
      );
    }
    const body = await request.json();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET_KEY as string)
      .update(JSON.stringify(body))
      .digest("hex");

    if (expectedSignature !== signature) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Signature" }),
        { status: 401 }
      );
    }

    const { eventType, data } = body as TWebhookPaylaod;

    const dbPath = path.join(process.cwd(), "db.json");

    let dbData: TStoredData[] = [];

    if (fs.existsSync(dbPath)) {
      dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    }

    dbData.push({ eventType, data, timestamp: new Date().toISOString() });

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    return new NextResponse(
      JSON.stringify({ success: true, message: "Received" }),
      { status: 200 }
    );
  } catch {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};
