import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './site/App.tsx'

// The homepage must start at its full hero instead of a browser-restored mid-page position.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
if (window.location.pathname === '/' && !window.location.hash) window.scrollTo(0, 0)
window.addEventListener('pageshow', () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (navigation?.type === 'reload' && window.location.pathname === '/' && !window.location.hash) window.scrollTo(0, 0)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
