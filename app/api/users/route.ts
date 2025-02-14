/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/app/lib/db";
import User from "@/app/lib/model/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error while fetching users" + error.message, {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connect();
    const result = await User.create(body);
    return new NextResponse(
      JSON.stringify({ message: "User is created", user: result })
    );
  } catch (error:any) {
    return new NextResponse("Error while creating user " + error.message, {
      status: 500,
    });
  }
};
