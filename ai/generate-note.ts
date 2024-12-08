import { NoteGenerated } from "@/interfaces/generated-note";
import Groq from "groq-sdk";

export const generateNote = async (groqInstance: Groq, context: string) => {
  const prompt = `
          You are a tool who create document according to a context
          You are not interacting with a human, but with a machine

          The following context is a user input that needs be generated into a note:
          ${context}

          -----------------------------
          Instructions:

          - Generate a note according the context
          - According the context, generate a title that make sense with the content
          - According the context, generate 1 description that make sense with the content
          - According the context, generate 1 general tags we can classify the pdf with according to the content
          - According the context, generate a summary of the context
          - Generate the note in markdown format
          - The tags should be general and not too specific to this document
          - Don't hallucinate, just use the user context
          - Reply all your answers according the language of the context
          - Reply with the following JSON structure:
          {
            "summary": "The summary of the pdf",
            "title": "Title 1",
            "tag": "#Tag1",
            "description": "Description 1",
            "markdownContent": "The markdown content of the pdf"
          }
          `;

  const data = await groqInstance.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
        name: "generateNote",
      },
    ],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
  });

  if (!data.choices[0]?.message?.content) {
    return null;
  }

  return (JSON.parse(data.choices[0].message.content) as NoteGenerated) || null;
};
