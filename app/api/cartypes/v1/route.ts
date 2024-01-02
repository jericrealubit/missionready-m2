import { NextResponse } from "next/server";
import connect from "@/utils/db";
import CarTypes from "@/models/CarTypes";

export const GET = async (req: NextResponse) => {
  // const url = new URL(req.url);
  // const username = url.searchParams.get("username");

  try {
    await connect();
    const carTypes = await CarTypes.find();

    return new NextResponse(JSON.stringify(carTypes), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(`Database Error: ${err}`, { status: 500 });
  }
};
