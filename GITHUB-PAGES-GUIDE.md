
# Deploying to GitHub Pages

This dashboard is configured to work with GitHub Pages for easy deployment and embedding.

## How to Deploy

1. Push your changes to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select the branch you want to deploy (usually "main")
5. Click "Save"

GitHub will automatically build and deploy your site. After a few minutes, it will be available at:
`https://[your-username].github.io/[repository-name]/`

## How to Embed in Wix

Once deployed to GitHub Pages, you can embed this dashboard in your Wix site:

1. In your Wix editor, add an HTML iframe element
2. Set the source URL to your GitHub Pages URL
3. Set appropriate width and height (recommend 100% width and at least 800px height)

### Example Wix Embed Code:

```html
<iframe 
  src="https://[your-username].github.io/[repository-name]/" 
  width="100%" 
  height="800px" 
  frameborder="0">
</iframe>
```

## Accessing Form Data from Wix

You can access the form data from your Wix site using JavaScript:

```javascript
// Add this code to your Wix site's page code
$w.onReady(function () {
  // Get the iframe element
  const iframe = $w('#html1'); // Replace with your iframe component ID
  
  // Function to get form data from the iframe
  function getFormData() {
    iframe.postMessage({ type: 'GET_FORM_DATA' });
  }
  
  // Listen for messages from the iframe
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'FORM_DATA_RESPONSE') {
      // Use the form data
      console.log('Form data:', event.data.data);
    }
  });
  
  // Example: Get form data when a button is clicked
  $w('#button1').onClick(() => {
    getFormData();
  });
});
```
