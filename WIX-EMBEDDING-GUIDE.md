
# Embedding the Hydrogen Device Form in Wix

This guide explains how to embed the Hydrogen Device Form into your Wix website.

## Step 1: Build the Application

1. Run `npm run build` to create a production build
2. The build will be in the `dist` folder

## Step 2: Host the Built Files

You have two options:
1. Upload the files to your own hosting (recommended for better control)
2. Use a static hosting service like Netlify, Vercel, or GitHub Pages

## Step 3: Embed in Wix

1. In Wix Editor, add an "HTML iframe" element to your page (Add > Embed > HTML iframe)
2. Set the iframe URL to your hosted application URL
3. Set the height to at least 800px and width to 100% for proper display
4. Adjust as needed to fit your page layout

## Step 4: Accessing Form Data (Optional)

If you need to access form data from Wix:

1. Add a custom code element in Wix
2. Use this code to access form data from the iframe:

```javascript
// Example code to get form data from the iframe
function getHydrogenFormData() {
  const iframe = document.querySelector('iframe'); // Adjust selector as needed
  if (iframe && iframe.contentWindow) {
    const formData = iframe.contentWindow.HydrogenFormData.getFormData();
    console.log('Form data:', formData);
    return JSON.parse(formData);
  }
  return null;
}

// Example: Call this when you need the data
document.getElementById('yourWixButton').addEventListener('click', () => {
  const data = getHydrogenFormData();
  // Do something with the data
});
```

## Troubleshooting

- If the iframe doesn't load, check browser console for cross-origin errors
- You may need to enable CORS on your hosting service
- Adjust the iframe size if content appears cut off
