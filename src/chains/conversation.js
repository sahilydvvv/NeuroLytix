import { llm } from "../config/groq.js";
import { chatHistory } from "../memory/memory.js";

export async function llmInvoke(userInput) {

  chatHistory.push({
    role: "user",
    content: userInput
  });

  const response = await llm.invoke(chatHistory);

  chatHistory.push({
    role: "assistant",
    content: response.content
  });

  return response.content;
}