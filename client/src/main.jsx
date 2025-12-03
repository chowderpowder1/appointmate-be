import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AppProvider} from './components/Onboarding/AppContext.jsx'
import App from './App.jsx'

// Google Auth
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* use ENV and remove ClientID for production im too sleepy to do it rn*/}
    <GoogleOAuthProvider clientId="37228971260-jfvef04a9d2no3n8tdfshi1ou6q7fmg2.apps.googleusercontent.com">
    <AppProvider>
      <App/>
    </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
