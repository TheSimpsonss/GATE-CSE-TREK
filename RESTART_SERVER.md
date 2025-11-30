# Server Restart Instructions

The server needs to be restarted to load the new authentication routes.

## Steps to Restart:

1. **Stop the current server:**
   - If running in a terminal, press `Ctrl+C`
   - Or the process has been stopped automatically

2. **Navigate to the server directory:**
   ```bash
   cd server
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or if you have a dev script:
   ```bash
   npm run dev
   ```

4. **Verify the server started correctly:**
   You should see:
   - `🚀 Server running on port 5000`
   - `✅ MongoDB Connected`
   - `📡 API available at http://localhost:5000/api`

5. **Test the auth endpoint:**
   Open in browser: `http://localhost:5000/api/auth/test`
   Should return: `{"message":"Auth routes are working!"}`

6. **Try signing up again** - the 404 error should be resolved!

## If you still get 404:

- Make sure you're accessing the frontend through the Vite dev server (usually `http://localhost:5173`)
- The Vite proxy should forward `/api` requests to `http://localhost:5000`
- Check the browser console for any CORS or network errors

