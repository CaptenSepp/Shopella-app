import { getQueryClient } from '@/app/queryClient';
import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/App.css';
import { store } from '@/app/store';
import ErrorBoundary from '@/components/ui/ErrorBoundary'; // crash fallback UI
import { ToastProvider } from '@/components/ui/Toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import AuthSessionProvider from '@/features/auth/AuthSessionProvider';
import '@/index.css';
import App from '@/vite/App';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render( // mount app to #root
  <React.StrictMode>
    <Provider store={store}> {/* redux provider */}
      <AuthSessionProvider> {/* restore the real Supabase session before protected pages render */}
        <QueryClientProvider client={getQueryClient()}> {/* react-query provider */}
          <TooltipProvider>
            <ToastProvider> {/* toast context */}
              <ErrorBoundary>
                <App /> {/* route tree */}
              </ErrorBoundary>
            </ToastProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthSessionProvider>
    </Provider>
  </React.StrictMode>
)
