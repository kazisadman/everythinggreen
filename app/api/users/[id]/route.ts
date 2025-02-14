import User from "@/app/lib/model/user";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const GET = async (request: Request, context: { params: any }) => {
  const userId = context.params.id;

  try {
    const result = await User.findById({ _id:userId });
    return new NextResponse(
      JSON.stringify({ message: "User data fetched", user: result })
    );
  } catch (error: any) {
    return new NextResponse(
      "Error while fetching user by Id " + error.message,
      {
        status: 500,
      }
    );
  }
};
