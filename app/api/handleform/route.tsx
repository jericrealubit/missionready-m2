import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    name: "Jeric Realubit",
    age: "45",
  };

  return NextResponse.json({ data });
}

export async function POST(req: any, res: any) {
  const data = await req.json();
  console.log(data);

  return NextResponse.json(data);
}
