import type { ApiRequest, ApiResponse } from "../../../api/_lib/http"
import { handleOrdersRequest } from "../../../api/_lib/orders-handler"

const handleRequest = async (request: Request) => {
  // Adapt the Web Request API to the small request/response interface used by the shared handler.
  let body: unknown

  if (request.method === "POST") {
    try {
      body = await request.json()
    } catch {
      return Response.json({ message: "Request body must be valid JSON." }, { status: 400 })
    }
  }

  const apiRequest = {
    method: request.method,
    headers: {
      authorization: request.headers.get("authorization") ?? undefined,
    },
    body,
  } as unknown as ApiRequest

  let responseBody = ""
  let responseStatus = 200
  const responseHeaders = new Headers()

  const apiResponse = {
    // Capture the shared handler's status, headers, and JSON payload for NextResponse.
    get statusCode() {
      return responseStatus
    },
    set statusCode(status: number) {
      responseStatus = status
    },
    setHeader(name: string, value: number | string | readonly string[]) {
      responseHeaders.set(name, Array.isArray(value) ? value.join(", ") : String(value))
      return apiResponse
    },
    end(value?: unknown) {
      responseBody = value === undefined ? "" : String(value)
      return apiResponse
    },
  } as unknown as ApiResponse

  await handleOrdersRequest(apiRequest, apiResponse)

  return new Response(responseBody || null, {
    status: responseStatus,
    headers: responseHeaders,
  })
}

export const GET = handleRequest
// Both HTTP methods intentionally pass through the same authenticated dispatcher.
export const POST = handleRequest
