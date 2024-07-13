import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { story } = await req.json();
  const baseURL = process.env.Dify_Base_URL;
  const ApiKey = process.env.Dify_Token;

  try {
    const result = await fetch(`${baseURL}/workflows/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ApiKey}`,
      },
      body: JSON.stringify({
        inputs: { topic: story },
        response_mode: "blocking",
        user: "abc-123",
      }),
    });

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
