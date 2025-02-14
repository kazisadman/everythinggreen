/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/app/lib/db";
import User from "@/app/lib/model/user";
import verifyJwt from "@/app/middleware";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const generateAccessToken = (
  _id: Types.ObjectId,
  email: string | undefined
) => {
  return jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export const GET = async (request: NextRequest) => {
  const user = verifyJwt(request);
  if (user instanceof NextResponse) return user;

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
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const body = { name, email, password: hashedPassword };

    await connect();

    const result = await User.create(body);

    const accessToken = generateAccessToken(result?._id, result?.email);

    const response = new NextResponse(
      JSON.stringify({ message: "User is created", user: result })
    );

    response.headers.set(
      "Set-Cookie",
      `token=${accessToken};HttpOnly;Secure;SameSite=Strict;Path=/`
    );
    return response;
  } catch (error: any) {
    return new NextResponse("Error while creating user " + error.message, {
      status: 500,
    });
  }
};
