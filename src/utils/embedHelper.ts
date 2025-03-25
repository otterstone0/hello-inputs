
/**
 * Saves the form data to a hidden element and sends it to the parent window
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
  
  // Send message to parent window
  if (window.parent !== window) {
    try {
      window.parent.postMessage({
        type: 'FORM_DATA_RESPONSE',
        data
      }, '*', undefined); // Fixed by adding undefined as the third parameter
    } catch (e) {
      console.error('Failed to send message to parent window:', e);
    }
  }
};

/**
 * Listen for messages from the parent window requesting form data
 * @param getFormData Function that returns the current form data
 */
export const setupMessageListener = (getFormData: () => unknown) => {
  window.addEventListener('message', (event) => {
    // Check if the message is requesting form data
    if (event.data && event.data.type === 'GET_FORM_DATA') {
      const data = getFormData();
      
      // Send the data back to the parent window
      try {
        if (event.source && 'postMessage' in event.source) {
          (event.source as Window).postMessage({
            type: 'FORM_DATA_RESPONSE',
            data
          }, '*', undefined); // Fixed by adding undefined as the third parameter
        }
      } catch (e) {
        console.error('Failed to send response to parent window:', e);
      }
    }
  });
};
