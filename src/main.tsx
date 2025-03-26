
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Define the interface for our global object
declare global {
  interface Window {
    HydrogenFormData: {
      getFormData: () => unknown;
      getSubmissions: () => unknown;
    };
  }
}

// Create window globals to allow external access to form data
window.HydrogenFormData = {
  getFormData: () => {
    // This function can be called from external sites to get the current form data
    return document.getElementById('hydrogen-form-data')?.textContent ? 
      JSON.parse(document.getElementById('hydrogen-form-data')?.textContent || '{}') : 
      {};
  },
  getSubmissions: () => {
    // Return empty array as default, will be properly initialized in App.tsx
    return [];
  }
};

// Listen for messages from parent window
window.addEventListener('message', (event) => {
  console.log('Message received from parent:', event.data);
});

createRoot(document.getElementById("root")!).render(<App />);
