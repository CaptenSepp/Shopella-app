import type { KeyboardEvent, RefObject } from "react"
import type { UIMessage } from "ai"
import { MessageCircle, Square, X } from "lucide-react"
import { Streamdown } from "streamdown"
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation"

type AssistantPanelNextProps = {
  draftText: string
  errorMessage?: string
  inputRef: RefObject<HTMLTextAreaElement | null>
  isOpen: boolean
  isWorking: boolean
  messages: UIMessage[]
  panelRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLButtonElement | null>
  onClear: () => void
  onClose: () => void
  onDraftChange: (value: string) => void
  onSend: () => void
  onStop: () => void
  onToggle: () => void
}

const AssistantPanelNext = ({ draftText, errorMessage, inputRef, isOpen, isWorking, messages, onClear, onClose, onDraftChange, onSend, onStop, onToggle, panelRef, triggerRef }: AssistantPanelNextProps) => (
  <div className="assistant-fab">
    <div ref={panelRef} id="assistant-panel" role="dialog" aria-modal="false" aria-hidden={!isOpen} aria-labelledby="assistant-panel-title" inert={!isOpen} className={`assistant-panel ${isOpen ? "assistant-panel--open" : ""}`}>
      <div className="assistant-panel__header">
        <span id="assistant-panel-title" className="assistant-panel__title">Shopella Assistant</span>
        <div className="assistant-panel__actions">
          <button type="button" className="assistant-panel__text-btn" onClick={onClear}>Clear chat</button>
          <button type="button" className="assistant-panel__close" aria-label="Close assistant panel" onClick={onClose}><X size={16} /></button>
        </div>
      </div>

      <Conversation className="assistant-panel__conversation">
        <ConversationContent className="assistant-panel__messages">
          {messages.length === 0 ? <ConversationEmptyState title="Ask for shopping advice" description="Try: Which beauty product is highly rated?" /> : messages.map((message) => (
            <div key={message.id} className={`group flex w-full max-w-[95%] flex-col gap-2 ${message.role === "user" ? "is-user ml-auto justify-end" : "is-assistant"}`}>
              <div className="is-user:dark flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground group-[.is-assistant]:text-foreground">
                {message.parts.filter((part) => part.type === "text").map((part, index) => <Streamdown key={`${message.id}-${index}`} className="size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{part.text}</Streamdown>)}
              </div>
            </div>
          ))}
          {isWorking ? <p className="assistant-panel__status" role="status">Finding useful suggestions...</p> : null}
          {errorMessage ? <p className="assistant-panel__error" role="alert">{errorMessage}</p> : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="assistant-panel__composer">
        <textarea ref={inputRef} className="assistant-panel__input" rows={1} maxLength={800} value={draftText} placeholder="Ask about the Shopella catalogue" disabled={isWorking} onChange={(event) => onDraftChange(event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key !== "Enter" || event.shiftKey) return; event.preventDefault(); onSend() }} />
        {isWorking ? <button type="button" className="assistant-panel__send" onClick={onStop} aria-label="Stop response"><Square size={15} /></button> : <button type="button" className="assistant-panel__send" onClick={onSend} disabled={!draftText.trim()} aria-label="Send message">Send</button>}
      </div>
      <p className="assistant-panel__privacy">Messages are sent to Groq for shopping advice. The assistant cannot place orders.</p>
    </div>
    <button ref={triggerRef} type="button" className="assistant-fab__btn" aria-label="Open Shopella Assistant" aria-expanded={isOpen} aria-controls="assistant-panel" onClick={onToggle}>
      <MessageCircle size={20} />
    </button>
  </div>
)

export default AssistantPanelNext
