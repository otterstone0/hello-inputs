
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create window globals to allow Wix to access form data
window.HydrogenFormData = {
  getFormData: () => {
    // This function can be called from Wix to get the current form data
    return document.getElementById('hydrogen-form-data')?.textContent || '{}';
  }
};

// Listen for messages from parent window (Wix)
window.addEventListener('message', (event) => {
  // You can implement message handling here if needed
  console.log('Message received from parent:', event.data);
});

createRoot(document.getElementById("root")!).render(<App />);
