import connect from "@/app/lib/db";
import User from "@/app/lib/model/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return new NextResponse("Error while fetching users" + error.message, {
      status: 500,
    });
  }
};
