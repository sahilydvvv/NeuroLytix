import readline from "readline";
import { llmInvoke } from "../chains/conversation.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function ask() {

  rl.question("You: ", async (input) => {

    if (input.toLowerCase() === "exit") {
      console.log("Jarvis: Goodbye Sahil!");
      rl.close();
      return;
    }

    try {

      const response = await llmInvoke(input);

      console.log("Jarvis:", response);

    } catch (error) {

      console.error("Error:", error);

    }

    ask();
  });
}

