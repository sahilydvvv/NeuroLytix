import { tool } from "langchain";
import * as z from "zod";
import open from "open";

export const appOpen = tool(
  async ({ appName }) => {
    try {
      const name = appName.toLowerCase();
      let url = "";

      if (name.includes("youtube")) url = "https://www.youtube.com";
      else if (name.includes("spotify")) url = "https://www.spotify.com";
      else if (name.includes("netflix")) url = "https://www.netflix.com";
      else if (name.includes("twitter") || name.includes("x")) url = "https://x.com";
      else if (name.includes("instagram")) url = "https://www.instagram.com";
      else if (name.includes("facebook")) url = "https://www.facebook.com";
      else if (name.includes("whatsapp")) url = "https://web.whatsapp.com";
      else if (name.includes("linkedin")) url = "https://www.linkedin.com";
      else if (name.includes("github")) url = "https://github.com";
      else if (name.includes("gmail")) url = "https://mail.google.com";
      else if (name.includes("google")) url = "https://www.google.com";
      else if (name.includes("amazon")) url = "https://www.amazon.com";
      else if (name.includes("flipkart")) url = "https://www.flipkart.com";
      else if (name.includes("chatgpt")) url = "https://chat.openai.com";
      else if (name.includes("reddit")) url = "https://www.reddit.com";
      else if (name.includes("stackoverflow")) url = "https://stackoverflow.com";

      if (url) {
        await open(url);
        return `Opening ${appName}...`;
      }

      return `Sorry, I don't know how to open ${appName}.`;

    } catch (error) {
      throw new Error("No information about the app");
    }
  },
  {
    name: "app_open",
    description: "Open a specified application or website.",
    schema: z.object({
      appName: z.string().describe("The name of the application or website to open."),
    }),
  }
);