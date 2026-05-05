import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { themeOptions } from './theme/maintheme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={themeOptions}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
