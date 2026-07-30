import type { MotionProps } from "framer-motion"

export const hoverIconMotion = {
  variants: {
    hover: { y: -3, rotate: -5 },
  },
  transition: { duration: 0.28, ease: "easeOut" },
} satisfies MotionProps

export const assistantBoxMotion = {
  initial: { y: 72, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay: 0.8, duration: 2.7, ease: [0.2, 0.8, 0.2, 1] },
} satisfies MotionProps
