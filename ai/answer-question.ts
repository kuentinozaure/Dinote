import { Answer } from "@/interfaces/answer";
import Groq from "groq-sdk";

export interface MarkdownContent {
  markdownContent: string;
}

export const answerQuestion = async (groqInstance: Groq, context: string) => {
  const prompt = `
          You are a tool who answer user questions.
          You are not interacting with a human

          The following context is the question that needs to be answered:
          ${context}

          -----------------------------
          Instructions:

          - Convert the question to a correct formatted
          - Don't hallucinate, just use the context of the question
          - Reply with the following JSON structure:
          {
            answer: "the answer of the question"
          }
          `;

  const data = await groqInstance.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
        name: "pdf",
      },
    ],
    model: "llama3-8b-8192",
    response_format: { type: "json_object" },
  });

  if (!data.choices[0]?.message?.content) {
    return null;
  }

  return (JSON.parse(data.choices[0].message.content) as Answer) || null;
};
