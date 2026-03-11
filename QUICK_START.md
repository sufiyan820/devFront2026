# Quick Start Guide

## Your Server is Running!

The dev server started successfully but on a different port:

**Current URL**: `http://13.60.84.8/`

Ports 5173 and 5174 were already in use, so Vite automatically used port 5175.

## To Access Your App

1. **Open your browser**
2. **Go to**: `http://13.60.84.8/`
3. You should see the ecommerce app!

## Fix Port Conflicts (Optional)

If you want to use port 5173:

1. **Find what's using the ports**:
   ```powershell
   netstat -ano | findstr :5173
   netstat -ano | findstr :5174
   ```

2. **Kill the processes** (replace <PID> with actual process ID):
   ```powershell
   taskkill /PID <PID> /F
   ```

3. **Restart dev server**:
   ```bash
   npm run dev
   ```

## Or Use a Specific Port

Update `vite.config.js`:
```javascript
server: {
  port: 3000,  // Use port 3000
  // ...
}
```

Then restart: `npm run dev`

## Check Browser Console

If you see a blank page:
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - are files loading?

## Common Issues

### Blank Page
- Check browser console for errors
- Verify backend is running on port 8080
- Check Network tab for failed requests

### CORS Errors
- Backend must be running
- Backend CORS should allow `http://localhost:5175` (or your port)

### Module Errors
- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear browser cache: `Ctrl+Shift+R`

## Next Steps

1. ✅ Server is running on `http://localhost:5175/`
2. Open that URL in your browser
3. Check browser console for any errors
4. Make sure backend is running on port 8080
