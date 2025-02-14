import { NextResponse } from "next/server";

export const POST = async () => {
  const response = new NextResponse(
    JSON.stringify({ message: "User logged out successfully" })
  );

  response.headers.set("Set-Cookie", "token=;HttpOnly;Secure;path=/");
  return response;
};
