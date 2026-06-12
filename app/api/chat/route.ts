import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload. Expected an array of 'messages'." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured on the server.\n\nPlease set GEMINI_API_KEY in your '.env.local' file to enable the AI Chatbot helper.",
          isConfigError: true,
        },
        { status: 500 }
      );
    }

    // Map messages format from standard (user, assistant) to Gemini format (user, model)
    const geminiMessages = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content || "" }],
    }));

    const systemInstructionText = `
You are the "SE Toolkit AI Assistant", a specialized AI teaching assistant for the Software Engineering Education Toolkit (developed by Brunel University London).
Your primary objectives are:
1. Help students learn Software Engineering concepts, requirements engineering (e.g. User Stories, Acceptance Criteria), and UML modeling.
2. Answer questions about the toolkit, the AI mentor personas (Tutor, Expert, Peer), and how to navigate the lab modules.
3. Provide constructive, well-formatted, and encouraging feedback. Use clean markdown formatting (bolding, headers, lists, code frames) to render responses beautifully.

Strict Guardrails for Educational Focus:
- You are specialized in Software Engineering and Computer Science. If the user asks questions that are completely unrelated to Software Engineering, UML, or Computer Science (such as recipes, celebrity news, movie plots, physical sports, non-technical queries), you MUST politely refuse to answer and guide them back to software studies. For example: "I am specialized in Software Engineering and the SE Education Toolkit. Let's keep our focus on software requirements, UML modeling, or the lab exercises!"
- MUSIC RULE: If the user asks for any songs, music, lyrics, musical bands, or playlists, you must ONLY respond with the exact text: "Fear Allah". Do not add any greeting, punctuation, explanation, or additional words.
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: geminiMessages,
      systemInstruction: {
        parts: [{ text: systemInstructionText }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Gemini API error occurred during processing." },
        { status: response.status }
      );
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to process that. Please try rephrasing your question.";
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
