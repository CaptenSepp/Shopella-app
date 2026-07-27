import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useCallback, useEffect, useRef, useState } from "react"
import { ASSISTANT_DRAFT_KEY, loadStoredDraft } from "@/components/ui/assistant-fab-tools"
import { useDialogFocus } from "@/components/ui/use-dialog-focus"
import AssistantPanelNext from "./AssistantPanelNext"

const assistantTransport = new DefaultChatTransport({ api: "/api/assistant" })

const AssistantFabNext = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [draftText, setDraftText] = useState(loadStoredDraft)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const { error, messages, sendMessage, setMessages, status, stop } = useChat({ transport: assistantTransport, experimental_throttle: 50 })
  const isWorking = status === "submitted" || status === "streaming"
  const closePanel = useCallback(() => setIsOpen(false), [])

  useDialogFocus({ containerRef: panelRef, isOpen, lockBodyScroll: false, onClose: closePanel, triggerRef })

  useEffect(() => {
    try { localStorage.setItem(ASSISTANT_DRAFT_KEY, draftText) } catch { return }
    const input = inputRef.current
    if (input) { input.style.height = "0px"; input.style.height = `${input.scrollHeight}px` }
  }, [draftText])

  const sendDraft = () => {
    const text = draftText.trim()
    if (!text || isWorking) return
    setDraftText("")
    void sendMessage({ text })
  }

  return <AssistantPanelNext draftText={draftText} errorMessage={error?.message} inputRef={inputRef} isOpen={isOpen} isWorking={isWorking} messages={messages} panelRef={panelRef} triggerRef={triggerRef} onClear={() => { setMessages([]); setDraftText("") }} onClose={closePanel} onDraftChange={setDraftText} onSend={sendDraft} onStop={() => void stop()} onToggle={() => setIsOpen((current) => !current)} />
}

export default AssistantFabNext
