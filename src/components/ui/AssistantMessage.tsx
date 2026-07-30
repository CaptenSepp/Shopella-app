import { motion } from "framer-motion"
import type { UIMessage } from "ai"
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message"
import { assistantBoxMotion } from "@/components/ui/motion-presets"

const AssistantMessage = ({ message }: { message: UIMessage }) => (
  <motion.div {...assistantBoxMotion}>
    <Message from={message.role}>
      <MessageContent className={`h-auto overflow-visible rounded-lg border border-white/60 px-4 py-3 text-white ${message.role === "assistant" ? "bg-[#202024]" : "bg-[#34343a]"}`}>
        <motion.div
          className="h-auto w-full overflow-visible"
          initial={{ color: "rgba(255, 255, 255, 0)" }}
          animate={{ color: "rgba(255, 255, 255, 1)" }}
          transition={{ delay: 3.55, duration: 0.72 }}
        >
          {message.parts
            .filter((part) => part.type === "text")
            .map((part, index) => (
              <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
            ))}
        </motion.div>
      </MessageContent>
    </Message>
  </motion.div>
)

export default AssistantMessage
