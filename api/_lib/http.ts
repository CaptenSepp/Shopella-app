import type { IncomingMessage, ServerResponse } from "node:http"

export type ApiRequest = IncomingMessage & { body?: unknown }
export type ApiResponse = ServerResponse

export const sendJson = (response: ApiResponse, status: number, data: unknown) => {
  response.statusCode = status
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.end(JSON.stringify(data))
}

export const readRequestBody = async (request: ApiRequest): Promise<unknown> => {
  if (request.body !== undefined) return request.body // Vercel normally provides parsed JSON here.
  const chunks: Buffer[] = []
  for await (const chunk of request) chunks.push(Buffer.from(chunk))
  const rawBody = Buffer.concat(chunks).toString("utf8")
  if (!rawBody) return {}

  try {
    return JSON.parse(rawBody)
  } catch {
    throw new Error("Request body must be valid JSON.")
  }
}
