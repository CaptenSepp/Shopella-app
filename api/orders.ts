import type { ApiRequest, ApiResponse } from "./_lib/http.js"
import { handleOrdersRequest } from "./_lib/orders-handler.js"

export default function handler(request: ApiRequest, response: ApiResponse) {
  return handleOrdersRequest(request, response)
}
