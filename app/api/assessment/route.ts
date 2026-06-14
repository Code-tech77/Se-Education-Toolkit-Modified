import { NextRequest, NextResponse } from "next/server";
import { LOCAL_QUESTIONS, LocalQuestion } from "@/data/local-questions";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, excludeQuestions } = await req.json();

    const targetTopic = topic || "Requirements Engineering";
    const targetDifficulty = difficulty || "easy";
    const excluded = Array.isArray(excludeQuestions) ? excludeQuestions : [];

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const promptText = `
You are a Software Engineering professor testing a student's knowledge.
Generate exactly ONE multiple choice question on the topic "${targetTopic}" with difficulty level "${targetDifficulty}".

Requirements:
- The question must have exactly 4 choices/options.
- Provide a clear, educational explanation for why the correct answer is correct.
- Ensure the question matches the difficulty level:
  - Easy: checks basic definitions, terms, or vocabulary.
  - Medium: checks application of concepts, analysis, or error recognition.
  - Hard: checks complex scenarios, system design trade-offs, or advanced logic.
- Avoid repeating these questions: ${JSON.stringify(excluded)}.

Return your response in raw JSON format matching this schema:
{
  "question": "The question text?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "Detailed explanation of why the correct option is right."
}

Do not wrap the JSON in markdown code blocks. Output raw JSON only.
`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: promptText }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json",
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          
          // Sanitize potential markdown blocks
          if (rawText.startsWith("```")) {
            rawText = rawText.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
          }
          rawText = rawText.trim();

          const parsed = JSON.parse(rawText);
          if (
            parsed.question &&
            Array.isArray(parsed.options) &&
            parsed.options.length === 4 &&
            typeof parsed.correctIndex === "number" &&
            parsed.explanation
          ) {
            return NextResponse.json({ question: parsed, source: "ai" });
          }
        }
      } catch (aiError) {
        console.error("Gemini assessment generation failed, falling back to local questions:", aiError);
      }
    }

    // Fallback: search in local questions bank
    let candidates = LOCAL_QUESTIONS.filter(
      (q) => q.topic.toLowerCase() === targetTopic.toLowerCase() && q.difficulty === targetDifficulty
    );

    // Filter out excluded questions
    let unused = candidates.filter((q) => !excluded.includes(q.question));

    // If all target topic/difficulty questions are exhausted, expand to any unused questions in this topic
    if (unused.length === 0) {
      candidates = LOCAL_QUESTIONS.filter((q) => q.topic.toLowerCase() === targetTopic.toLowerCase());
      unused = candidates.filter((q) => !excluded.includes(q.question));
    }

    // If still empty, reset exclusions and take any question from the topic
    if (unused.length === 0) {
      unused = LOCAL_QUESTIONS.filter((q) => q.topic.toLowerCase() === targetTopic.toLowerCase());
    }

    // If completely empty (unknown topic), take any question from database
    if (unused.length === 0) {
      unused = LOCAL_QUESTIONS;
    }

    const randomPick = unused[Math.floor(Math.random() * unused.length)];
    
    // Structure response like dynamic generator
    const formattedQuestion = {
      question: randomPick.question,
      options: randomPick.options,
      correctIndex: randomPick.correctIndex,
      explanation: randomPick.explanation,
    };

    return NextResponse.json({ question: formattedQuestion, source: "local" });

  } catch (error: any) {
    console.error("Assessment API route error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
