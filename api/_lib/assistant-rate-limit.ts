import { createHash } from "node:crypto"
import type { ApiRequest } from "./http.js"
import { createServerSupabase } from "./supabase-server.js"

const REQUEST_LIMIT = 5
const WINDOW_MILLISECONDS = 60_000

export const checkAssistantRateLimit = async (request: ApiRequest) => {
  const salt = process.env.RATE_LIMIT_SALT
  if (!salt) throw new Error("Assistant rate-limit environment is missing.")
  const forwardedIp = String(request.headers["x-forwarded-for"] ?? request.socket.remoteAddress ?? "unknown").split(",")[0].trim()
  const fingerprint = createHash("sha256").update(`${forwardedIp}:${salt}`).digest("hex")
  const windowStart = new Date(Date.now() - WINDOW_MILLISECONDS).toISOString()
  const supabase = createServerSupabase()

  // The database count works across serverless instances, unlike a local in-memory counter.
  const countResult = await supabase.from("assistant_requests").select("id", { count: "exact", head: true }).eq("fingerprint", fingerprint).gte("created_at", windowStart)
  if (countResult.error) throw countResult.error
  if ((countResult.count ?? 0) >= REQUEST_LIMIT) return false
  const insertResult = await supabase.from("assistant_requests").insert({ fingerprint })
  if (insertResult.error) throw insertResult.error
  return true
}
