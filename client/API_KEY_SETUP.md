# Gemini API Key Setup

## How to Get Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## How to Add the API Key

1. Open the `.env` file in the `client` directory
2. Replace `your_api_key_here` with your actual API key:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

3. Save the file
4. **Restart the Vite dev server** for the changes to take effect

## Important Notes

- The `.env` file is already in `.gitignore` so your API key won't be committed to git
- Never share your API key publicly
- The API key is used only for the AI Mentor feature
- If you don't set the API key, the AI Mentor will show an error message

## Example

```
VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```


