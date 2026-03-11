# Troubleshooting - No Output on Localhost

## Quick Fixes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://13.60.84.8/
  ➜  Network: use --host to expose
```

### 3. Check Browser Console
Open browser DevTools (F12) and check for errors:
- Red errors in Console tab
- Network tab for failed requests
- Elements tab to see if `<div id="root">` exists

## Common Issues

### Issue 1: Port Already in Use
**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Issue 2: Dependencies Not Installed
**Error**: `Cannot find module 'react'` or similar

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Browser Shows Blank Page
**Check**:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify `http://13.60.84.8` is accessible
4. Check Network tab - is `main.jsx` loading?

### Issue 4: CORS Errors
**Error**: `CORS policy` errors in console

**Solution**: 
- Backend must be running on `http://13.60.84.8`
- Backend CORS configured for `http://13.60.84.8`

### Issue 5: Module Not Found
**Error**: `Failed to resolve import`

**Solution**:
- Check file paths are correct
- Check imports use correct extensions (.jsx)
- Restart dev server: `Ctrl+C` then `npm run dev`

## Step-by-Step Debugging

1. **Verify Files Exist**:
   ```
   ✓ index.html
   ✓ src/main.jsx
   ✓ src/App.jsx
   ✓ vite.config.js
   ```

2. **Check Terminal Output**:
   - Look for compilation errors
   - Check for warnings
   - Verify server started successfully

3. **Browser DevTools**:
   - Console: Check for errors
   - Network: Verify files loading
   - Elements: Check if root div exists

4. **Verify Backend**:
   - Backend running on port 8080?
   - CORS configured correctly?

## Test Basic Setup

Create a simple test file `src/Test.jsx`:
```jsx
export default function Test() {
  return <h1>Hello World</h1>
}
```

Update `src/App.jsx`:
```jsx
import Test from './Test'

function App() {
  return <Test />
}
```

If this works, the issue is in your components.

## Still Not Working?

1. **Clear Cache**:
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node Version**:
   ```bash
   node --version  # Should be 16+ 
   npm --version
   ```

3. **Try Different Port**:
   ```bash
   npm run dev -- --port 3000
   ```

4. **Check Vite Config**:
   - Verify `vite.config.js` syntax
   - Check React plugin is installed

## Expected Behavior

When working correctly:
1. Terminal shows: `VITE ready in xxx ms`
2. Browser shows: `http://localhost:5173/`
3. Page displays: Header, content, footer
4. No errors in browser console
