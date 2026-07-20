import { useEffect, type RefObject } from "react"

const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])"

type DialogFocusOptions = {
  containerRef: RefObject<HTMLElement | null>
  isOpen: boolean
  onClose: () => void
  triggerRef?: RefObject<HTMLElement | null>
}

export const useDialogFocus = ({ containerRef, isOpen, onClose, triggerRef }: DialogFocusOptions) => {
  useEffect(() => {
    if (!isOpen) return
    const dialog = containerRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    const triggerElement = triggerRef?.current
    document.body.style.overflow = "hidden"

    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
    window.requestAnimationFrame(() => focusable()[0]?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose()
      if (event.key !== "Tab") return
      const elements = focusable()
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
      triggerElement?.focus()
    }
  }, [containerRef, isOpen, onClose, triggerRef])
}
