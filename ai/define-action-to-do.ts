import { Actions } from "@/enums/actions";
import { ActionToRealize } from "@/interfaces/action-to-realize";
import Groq from "groq-sdk";

export async function defineActionsToAchieve(
  groqInstance: Groq,
  userPrompt: string
): Promise<ActionToRealize | null> {
  const prompt = `
          You are a tool who define which actions to achieve
          You are not interacting with a human, but with a machine

          The following context is what user want to do :
          ${userPrompt}

          -----------------------------
          Instructions:

          - Reply with an actions the app can do. The app can : 
            - Import a file. The action to return should be "${Actions.IMPORT_FILE}"
            - Generate a quick note about a theme or a subject, the action to return should be "${Actions.GENERATE_NOTE}"
            - If user ask you a question, return "${Actions.ANSWER_QUESTION}"
            - If you don't know what to do, return "${Actions.UNKNOWN}"
          - Don't hallucinate
          - Reply with the following JSON structure:
          {
            "action": "import-pdf"
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
    (JSON.parse(data.choices[0].message.content) as ActionToRealize) || null
  );
}
