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
  // Client-only providers are composed here so the root layout can stay a Server Component.
  return (
    <Provider store={store}>
      {/* Auth synchronizes Redux before authenticated queries and screens consume it. */}
      <AuthSessionProvider>
        <QueryClientProvider client={getQueryClient()}>
          {/* Visual contexts wrap the route content without owning application data. */}
          <ThemeProvider>
            <TooltipProvider>
              <ToastProvider>
                {/* Catch unexpected render failures at the widest useful boundary. */}
                <ErrorBoundary>{children}</ErrorBoundary>
              </ToastProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthSessionProvider>
    </Provider>
  )
}
