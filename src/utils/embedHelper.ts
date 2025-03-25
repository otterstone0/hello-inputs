
// This file contains helper functions for embedded mode communication

/**
 * Saves the current form data to a hidden element for access from the parent window
 * @param data The form data to save
 */
export const saveFormDataForEmbed = (data: unknown) => {
  // First, look for existing element
  let hiddenElement = document.getElementById('hydrogen-form-data');
  
  // If it doesn't exist, create it
  if (!hiddenElement) {
    hiddenElement = document.createElement('div');
    hiddenElement.id = 'hydrogen-form-data';
    hiddenElement.style.display = 'none';
    document.body.appendChild(hiddenElement);
  }
  
  // Set data as JSON string
  hiddenElement.textContent = JSON.stringify(data);
  
  // Optionally notify parent window (Wix) that data has changed
  if (window.parent !== window) {
    try {
      window.parent.postMessage({
        type: 'HYDROGEN_FORM_DATA_UPDATED',
        data
      }, '*');
    } catch (e) {
      console.error('Failed to send message to parent window:', e);
    }
  }
};
