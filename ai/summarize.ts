import Groq from "groq-sdk";

export interface NoteSummarized {
  summary: string;
  titles: string[];
  tags: string[];
  description: string[];
}

export const summarizeNote = async (groqInstance: Groq, context: string) => {
  const prompt = `
          You are a tool who summarizes note pdfs
          You are not interacting with a human, but with a machine

          The following context is a pdf that needs to be summarized:
          ${context}

          -----------------------------
          Instructions:

          - Summarize the pdf
          - According your summary, generate 3 titles that make sense with the content
          - According your summary, generate 3 description that make sense with the content
          - According your summary, generate 3 general tags we can classify the pdf with according to the content
          - The tags should be general and not too specific to this document
          - Don't hallucinate, just use the content of the pdf
          - Reply all your answers according the language of the pdf
          - Reply with the following JSON structure:
          {
            "summary": "The summary of the pdf",
            "titles": ["Title 1", "Title 2", "Title 3"],
            "tags": ["#Tag1", "#Tag 2", "#Tag3"],
            description: ["Description 1", "Description 2", "Description 3"]
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

  return (
    (JSON.parse(data.choices[0].message.content) as NoteSummarized) || null
  );
};
