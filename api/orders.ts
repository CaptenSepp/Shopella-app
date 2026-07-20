import type { ApiRequest, ApiResponse } from "./_lib/http"
import { handleOrdersRequest } from "./_lib/orders-handler"

export default function handler(request: ApiRequest, response: ApiResponse) {
  return handleOrdersRequest(request, response)
}
