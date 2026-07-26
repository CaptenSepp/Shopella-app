"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { getQueryClient } from "@/app/queryClient"
import { store } from "@/app/store"
import { ThemeProvider } from "@/app/theme"
import ErrorBoundary from "@/components/ui/ErrorBoundary"
import { ToastProvider } from "@/components/ui/Toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import AuthSessionProvider from "@/features/auth/AuthSessionProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthSessionProvider>
        <QueryClientProvider client={getQueryClient()}>
          <ThemeProvider>
            <TooltipProvider>
              <ToastProvider>
                <ErrorBoundary>{children}</ErrorBoundary>
              </ToastProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthSessionProvider>
    </Provider>
  )
}
