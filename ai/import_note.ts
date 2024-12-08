import Groq from "groq-sdk";

export interface NoteGenerated {
  summary: string;
  title: string;
  tag: string;
  description: string;
}

export const importNote = async (groqInstance: Groq, context: string) => {
  const prompt = `
          You are a tool who create note from pdf
          You are not interacting with a human, but with a machine

          The following context is a pdf that needs be generated into a note:
          ${context}

          -----------------------------
          Instructions:

          - Summarize the pdf
          - According the pdf, generate a title that make sense with the content
          - According the pdf, generate 1 description that make sense with the content
          - According the pdf, generate 1 general tags we can classify the pdf with according to the content
          - Don't update the pdf content, just generate the convert it into markdown
          - The tags should be general and not too specific to this document
          - Don't hallucinate, just use the content of the pdf
          - Reply all your answers according the language of the pdf
          - Reply with the following JSON structure:
          {
            "summary": "The summary of the pdf",
            "title": "Title 1",
            "tag": "#Tag1",
            "description": "Description 1",
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
