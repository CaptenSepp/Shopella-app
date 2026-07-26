import { createGroq } from "@ai-sdk/groq"
import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { ZodError } from "zod"
import { buildAssistantSystemPrompt } from "../../../api/_lib/assistant-prompt"
import { assistantRequestSchema } from "../../../api/_lib/assistant-schema"
import { getCatalogProducts } from "../../../api/_lib/product-catalog"

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) throw new Error("Groq is not configured yet.")

    const parsed = assistantRequestSchema.parse(await request.json())
    const messages = parsed.messages.slice(-5) as UIMessage[]
    const products = await getCatalogProducts()
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

    // Stream the same catalogue-grounded response used by the Vite API.
    const result = streamText({
      model: groq("openai/gpt-oss-120b"),
      system: buildAssistantSystemPrompt(products),
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 500,
      onError: ({ error }) => console.error("Assistant request failed:", error instanceof Error ? error.message : "Unknown error"),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    const message = error instanceof ZodError
      ? "Your message is too long. Please keep it under 800 characters."
      : error instanceof Error ? error.message : "The assistant is unavailable."
    const status = message.includes("environment") || message.includes("configured") ? 503 : 400

    return Response.json({ message }, { status })
  }
}
