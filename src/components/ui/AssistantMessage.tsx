import type { UIMessage } from "ai"
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message"

const AssistantMessage = ({ message }: { message: UIMessage }) => (
  <Message from={message.role}>
    <MessageContent>
      {message.parts
        .filter((part) => part.type === "text")
        .map((part, index) => (
          <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
        ))}
    </MessageContent>
  </Message>
)

export default AssistantMessage
