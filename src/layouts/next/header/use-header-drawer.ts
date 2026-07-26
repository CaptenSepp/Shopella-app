"use client"

import { useCallback, useRef, useState } from "react"
import { useDialogFocus } from "@/components/ui/use-dialog-focus"

export const useHeaderDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false) // track drawer state
  const openButtonRef = useRef<HTMLButtonElement | null>(null) // restore focus on close
  const drawerRef = useRef<HTMLElement | null>(null)
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  useDialogFocus({ containerRef: drawerRef, isOpen: isDrawerOpen, onClose: closeDrawer, triggerRef: openButtonRef })

  return {
    isDrawerOpen,
    openButtonRef,
    drawerRef,
    closeDrawer, // shared close helper
    openDrawer: () => setIsDrawerOpen(true), // shared open helper
  }
}
