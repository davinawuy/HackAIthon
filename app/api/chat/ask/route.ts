import { NextRequest, NextResponse } from "next/server";
import { validateChatInput } from "@/lib/chat/guardrails";
import { answerChatQuestion } from "@/lib/chat/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body?.text ?? "";
    const eventId = body?.eventId as string | undefined;

    const validation = validateChatInput(text);

    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.reason },
        { status: 400 }
      );
    }

    const answer = await answerChatQuestion(text, eventId);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while generating a response.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}