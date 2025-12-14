import './index.css'
import { render } from 'preact'
import { Toaster } from 'react-hot-toast'
import App from './app'
import { ThemeProvider } from './hooks/use-theme'

render(
  <ThemeProvider>
    <App />
    <Toaster position="top-right" />
  </ThemeProvider>,
  document.getElementById('app')!
)
