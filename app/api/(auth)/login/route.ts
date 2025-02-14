/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/app/lib/model/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken } from "../../users/route";

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  try {
    const matchedUser = await User.findOne({email});

    if (!matchedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User do no exist", status: 404 })
      );
    }

    const passwordInDb = matchedUser?.password;

    const isPasswordCorrect = await bcrypt.compare(password, passwordInDb);

    if (!isPasswordCorrect) {
      return new NextResponse(
        JSON.stringify({ message: "Password Incorrect", status: 401 })
      );
    }

    const accessToken = generateAccessToken(
      matchedUser?._id,
      matchedUser?.email
    );

    const response = new NextResponse(
      JSON.stringify({
        message: "User logged in successfully",
        user: matchedUser,
      })
    );

    response.headers.set(
      "Set-Cookie",
      `token=${accessToken};HttpOnly;Secure;SameSite=Strict;Path=/`
    );
    return response;
  } catch (error: any) {
    return new NextResponse("Error while logging " + error.message, {
      status: 500,
    });
  }
};
