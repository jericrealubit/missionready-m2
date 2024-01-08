import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import CarTypes from "@/models/CarTypes";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connect();
    let itype = req.nextUrl.searchParams.get("type");
    if (itype) {
      return new NextResponse(
        JSON.stringify(await CarTypes.find({ type: new RegExp(itype, "i") })),
        {
          status: 200,
        }
      );
    } else {
      return new NextResponse(JSON.stringify(await CarTypes.find()), {
        status: 200,
      });
    }
  } catch (err) {
    return new NextResponse(`Database Error: ${err}`, { status: 500 });
  }
};
