import * as z from "zod";
import { tool } from "langchain";

export const calculator = tool(
  async ({ expression }) => {
    try {
      const result = eval(expression);
      return String(result);
    } catch {
      throw new Error("Invalid arithmetic expression");
    }
  },
  {
    name: "calculator",
    description:
      "Perform arithmetic calculations such as addition, subtraction, multiplication, and division.",
    schema: z.object({
      expression: z
        .string()
        .describe("perform the calculation and return the result as a string"),
    }),
  }
);