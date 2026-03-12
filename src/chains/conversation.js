import { llm } from "../config/groq.js";
import { chatHistory } from "../memory/memory.js";
import { calculator } from "../tools/calculator.js";
import { appOpen } from "../tools/appOpen.js";

export async function llmInvoke(userInput) {
  chatHistory.push({
    role: "user",
    content: userInput
  });
  const tools = [calculator, appOpen];
  const toolMap = {};
  for (const tool of tools) {
    toolMap[tool.name] = tool;
  }
  const llmWithTools = llm.bindTools(tools);
  let response = await llmWithTools.invoke(chatHistory);
  while (response.tool_calls && response.tool_calls.length > 0) {
    chatHistory.push(response);
    for (const toolCall of response.tool_calls) {
      const tool = toolMap[toolCall.name];
      if (!tool) continue;
      const toolResult = await tool.invoke(toolCall.args);
      chatHistory.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: toolResult
      });
    }
    response = await llmWithTools.invoke(chatHistory);
  }
  chatHistory.push({
    role: "assistant",
    content: response.content
  });
  return response.content;
}