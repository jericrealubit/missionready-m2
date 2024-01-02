import { NextResponse } from "next/server";
import connect from "@/utils/db";
import CarTypes from "@/models/CarTypes";

export const GET = async (req: NextResponse) => {
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
