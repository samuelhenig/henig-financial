import OpenAI from "openai";
import { financialGuidePrompt } from "../../../lib/financialGuidePrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    const { message, context } = body;

    if (!message) {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: financialGuidePrompt,
        },
        {
          role: "user",
          content: `
Client financial context:
${JSON.stringify(context || {}, null, 2)}

Client message:
${message}
          `,
        },
      ],
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "I’m sorry, I wasn’t able to respond right now.";

    return Response.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);

    return Response.json(
      { error: "AI response failed." },
      { status: 500 }
    );
  }
}
