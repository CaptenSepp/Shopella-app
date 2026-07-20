import { createGroq } from "@ai-sdk/groq"
import { convertToModelMessages, streamText, type UIMessage } from "ai"
import type { ApiRequest, ApiResponse } from "./_lib/http.js"
import { readRequestBody, sendJson } from "./_lib/http.js"
import { assistantRequestSchema } from "./_lib/assistant-schema.js"
import { buildAssistantSystemPrompt } from "./_lib/assistant-prompt.js"
import { getCatalogProducts } from "./_lib/product-catalog.js"

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST")
    return sendJson(response, 405, { message: "Method not allowed." })
  }

  try {
    if (!process.env.GROQ_API_KEY) throw new Error("Groq is not configured yet.")
    const parsed = assistantRequestSchema.parse(await readRequestBody(request))
    const messages = parsed.messages.slice(-10) as UIMessage[] // keep model context and cost controlled
    const products = await getCatalogProducts()
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

    const result = streamText({
      model: groq("openai/gpt-oss-120b"),
      system: buildAssistantSystemPrompt(products),
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 500,
      onError: ({ error }) => console.error("Assistant request failed:", error instanceof Error ? error.message : "Unknown error"),
    })
    return result.pipeUIMessageStreamToResponse(response)
  } catch (error) {
    const message = error instanceof Error ? error.message : "The assistant is unavailable."
    const status = message.includes("environment") || message.includes("configured") ? 503 : 400
    return sendJson(response, status, { message })
  }
}
