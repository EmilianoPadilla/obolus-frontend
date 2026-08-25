import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //all queries stay fresh for 5 minutes by default
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render( //Finds the <div id="root"> in index.html and tells React "render everything here"
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* Provides the React Query client to the entire app so we can use it anywhere in the app. React query is a JavaScript object that lives in memory and manages: The cache of all fetched data, when to refetch, how many times to retry failed requests, default options for all queries */}
      <BrowserRouter> {/* wraps App — so all pages can use useNavigate, Link etc. */}
        <App />
        <Toaster position="bottom-right" /> {/*This is the toast notification container. It will show toast notifications in the bottom-right corner of the screen */}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} /> {/*This is the little icon on the bottom right corner that has a palm tree. It shows all queries currently in cache, their status, etc. initialIsOpen=false means the panel will be closed by default when the app first loads */}
    </QueryClientProvider>
  </StrictMode>,
)