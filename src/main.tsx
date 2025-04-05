import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import './tailwind.css'

// Initialize Supabase client here if needed
// getSupabaseClient() will handle initialization internally

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
