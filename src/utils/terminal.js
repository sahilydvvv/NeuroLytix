import readline from "readline";
import { llmInvoke } from "../chains/conversation.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function ask() {

  rl.question("You: ", async (input) => {

    const command = input.trim().toLowerCase();

    if (command === "") {
      ask();
      return;
    }

    switch (command) {

      case "exit":
        console.log("Jarvis: Goodbye Sahil!");
        rl.close();
        return;

      case "clear":
        // console.clear();
        process.stdout.write("\x1Bc");
        ask();
        return;

      case "time":
        console.log("Jarvis: Current time is", new Date().toLocaleTimeString());
        ask();
        return;

      case "help":
        console.log("Jarvis: Available commands:");
        console.log("exit  - close Jarvis");
        console.log("clear - clear terminal");
        console.log("time  - show current time");
        console.log("help  - show commands");
        ask();
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