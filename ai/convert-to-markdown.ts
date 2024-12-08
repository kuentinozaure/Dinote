import Groq from "groq-sdk";

export interface MarkdownContent {
  markdownContent: string;
}

export const convertToMarkdown = async (
  groqInstance: Groq,
  context: string
) => {
  const prompt = `
          You are a tool who convert stringified notes from pdf to markdown
          You are not interacting with a human, but with a machine

          The following context is the pdf that needs to be converted to markdown:
          ${context}

          -----------------------------
          Instructions:

          - Convert the pdf to a correct formatted markdown
          - Don't hallucinate, just use the content of the pdf
          - Reply with the following JSON structure:
          {
            markdownContent: "The markdown content of the pdf"
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
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
  });

  if (!data.choices[0]?.message?.content) {
    return null;
  }

  return (
    (JSON.parse(data.choices[0].message.content) as MarkdownContent) || null
  );
};
