import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const verifyJwt = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return decode;
  } catch {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
    });
  }
};

export default verifyJwt;
