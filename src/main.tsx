import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "./lib/theme-provider.tsx";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
)
