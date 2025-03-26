
# Deploying to GitHub Pages

This dashboard is configured to work with GitHub Pages for easy deployment and embedding.

## How to Deploy

1. Push your changes to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Under "Build and deployment" section:
   - Select "Deploy from a branch" as the Source
   - Select your branch (usually "main" or "master")
   - Choose "/(root)" as the folder
   - Click "Save"

GitHub will automatically build and deploy your site. After a few minutes, it will be available at:
`https://[your-username].github.io/[repository-name]/`

## Important Notes

- The site is configured to use relative paths (using `base: './'` in vite.config.ts)
- No additional configuration is needed for basic GitHub Pages deployment
- If you're using a custom domain, you can configure it in the GitHub Pages settings

## Accessing Form Data

This form is designed to be embedded and to share data with parent applications:

```javascript
// Example code to get form data from your embedded app
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'FORM_DATA_RESPONSE') {
    // Use the form data
    console.log('Form data:', event.data.data);
  }
});

// Request the form data
const iframe = document.getElementById('your-iframe-id');
iframe.contentWindow.postMessage({ type: 'GET_FORM_DATA' }, '*');
```

## Accessing Form Submissions

When users submit the form, a CSV file will automatically download containing all the form data. Additionally, form submissions are stored in localStorage and can be accessed programmatically:

```javascript
// If accessing directly from the page:
const submissions = window.HydrogenFormData.getSubmissions();
console.log('All submissions:', submissions);

// If accessing from a parent window with an embedded iframe:
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'FORM_SUBMISSION') {
    // A new submission has been made
    console.log('New submission:', event.data.data);
  }
});
```
