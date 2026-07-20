export const ASSISTANT_DRAFT_KEY = "assistant-chat-draft"

export const loadStoredDraft = () => {
  try {
    return localStorage.getItem(ASSISTANT_DRAFT_KEY) ?? ""
  } catch {
    return ""
  }
}
