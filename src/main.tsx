import { createRoot } from 'react-dom/client';
import { setBaseUrl } from '@workspace/api-client-react';

import App from './App';

import './index.css';

// In the standalone Vercel deployment, the generated API client makes calls
// to paths like /api/tours, /api/reviews, etc. We need to prefix these with
// the backend origin so they resolve correctly instead of hitting Vercel's
// static server.
//
// VITE_API_URL = https://wavesofegypt.replit.app/api
// Generated paths already include /api, so we pass only the origin
// (https://wavesofegypt.replit.app) to avoid double-prefixing /api/api/tours.
const rawApiUrl = import.meta.env.VITE_API_URL;
if (rawApiUrl) {
  try {
    setBaseUrl(new URL(rawApiUrl).origin);
  } catch {
    // If URL parsing fails, strip a trailing /api suffix and use as-is
    setBaseUrl(rawApiUrl.replace(/\/api\/?$/, ''));
  }
}

createRoot(document.getElementById('root')!).render(<App />);
