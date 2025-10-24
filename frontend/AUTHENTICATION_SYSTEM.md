# 🔐 Authentication System Documentation

## Overview

The TraceonApp frontend has a complete authentication system with login, logout, and protected routes.

## Components

### 1. **AuthContext** (`/src/contexts/AuthContext.tsx`)

Provides authentication state and methods throughout the application.

**Features:**
- ✅ Login functionality
- ✅ Logout functionality
- ✅ Persistent sessions (localStorage)
- ✅ Loading states
- ✅ Automatic session restoration on page reload

**Available Methods:**
```typescript
const { user, login, logout, isLoading } = useAuth();

// Login
const success = await login(username, password);

// Logout (redirects to /landing)
logout();

// Check user state
if (user) {
  console.log(user.name, user.email, user.username);
}
```

**Demo Credentials:**
- Username: `test`
- Password: `test`

### 2. **ProtectedRoute** (`/src/components/ProtectedRoute.tsx`)

Wrapper component that protects routes from unauthorized access.

**Features:**
- ✅ Redirects to `/login` if not authenticated
- ✅ Shows loading spinner while checking auth
- ✅ Prevents unauthorized access to dashboard

**Usage:**
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <YourDashboardContent />
    </ProtectedRoute>
  );
}
```

### 3. **Login Page** (`/src/app/login/page.tsx`)

Full-featured login interface with:
- ✅ Username/password inputs
- ✅ Show/hide password toggle
- ✅ Error messages
- ✅ Loading states
- ✅ Auto-fill demo credentials button
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Sign up link

### 4. **Profile Dropdown** (in `ProfessionalDashboardLayout`)

**NEW:** Added complete profile dropdown with logout functionality.

**Features:**
- ✅ Displays current user info (name, email, initials)
- ✅ View Profile link
- ✅ Settings link
- ✅ Logout button with red warning color
- ✅ Click outside to close
- ✅ Smooth animations

**Location:** Top-right corner of dashboard header

## Authentication Flow

### Login Flow:
1. User visits `/login`
2. Enters credentials (test/test)
3. `login()` validates credentials
4. On success:
   - User object saved to state
   - Session saved to localStorage
   - Redirect to `/dashboard`
5. On failure:
   - Error message displayed
   - User remains on login page

### Logout Flow:
1. User clicks profile dropdown → Logout
2. `logout()` is called
3. User state cleared
4. localStorage cleared
5. Automatic redirect to `/landing`

### Session Persistence:
1. User logs in
2. Session saved to `localStorage` as `traceon_user`
3. On page reload/refresh:
   - AuthContext checks localStorage
   - If valid session found, user is restored
   - No need to login again

### Protected Routes:
1. User tries to access `/dashboard/*`
2. ProtectedRoute checks auth state
3. If not authenticated:
   - Shows loading spinner briefly
   - Redirects to `/login`
4. If authenticated:
   - Renders dashboard content

## User Object Structure

```typescript
interface User {
  username: string;  // e.g., "test"
  name: string;      // e.g., "Test User"
  email: string;     // e.g., "test@traceon.ai"
}
```

## Protected Pages

All dashboard pages are protected by wrapping them with `<ProtectedRoute>`:

- ✅ `/dashboard` - Overview
- ✅ `/dashboard/incidents`
- ✅ `/dashboard/logs`
- ✅ `/dashboard/metrics`
- ✅ `/dashboard/query-studio`
- ✅ `/dashboard/agent-console`
- ✅ `/dashboard/runbooks`
- ✅ `/dashboard/notifications`
- ✅ `/dashboard/topology`
- ✅ `/dashboard/integrations`
- ✅ `/dashboard/reports`
- ✅ `/dashboard/settings`

## Public Pages

These pages are accessible without authentication:

- `/` - Home/Landing page
- `/landing` - Landing page
- `/login` - Login page
- `/signup` - Signup page (if implemented)

## UI Components

### Profile Dropdown Menu

**Trigger:** Click on profile button (top-right corner)

**Contents:**
1. **Header Section:**
   - User avatar (initials)
   - Full name
   - Email address

2. **Menu Items:**
   - 👤 View Profile → `/profile`
   - ⚙️ Settings → `/dashboard/settings`

3. **Logout Section:**
   - 🚪 Logout (red warning color)

**Behavior:**
- Opens on click
- Closes when clicking outside
- Closes after selecting a menu item
- Smooth fade-in animation
- Hover effects on menu items

## Integration with Theme System

The authentication UI fully integrates with the theme system:

- ✅ Respects dark/light mode
- ✅ Uses CSS custom properties
- ✅ Smooth transitions between themes
- ✅ All colors adapt automatically

## Security Features

1. **Client-side validation:**
   - Required field checks
   - Error handling

2. **Session management:**
   - Automatic session restoration
   - Clean logout (removes all traces)

3. **Route protection:**
   - Prevents unauthorized access
   - Automatic redirects

4. **User feedback:**
   - Loading states during auth operations
   - Clear error messages
   - Success confirmations

## Testing the Authentication System

### Test Login:
1. Go to http://localhost:3001/login
2. Click "Auto-fill" button
3. Click "Sign in"
4. Should redirect to dashboard

### Test Session Persistence:
1. Login successfully
2. Refresh the page (Cmd+R / Ctrl+R)
3. Should remain logged in
4. Dashboard should load normally

### Test Logout:
1. While logged in, click profile button (top-right)
2. Click "Logout"
3. Should redirect to `/landing`
4. Trying to access `/dashboard` should redirect to `/login`

### Test Protected Routes:
1. Logout (or open incognito window)
2. Try to access http://localhost:3001/dashboard
3. Should automatically redirect to `/login`
4. After login, should redirect back to dashboard

## Future Enhancements

Potential improvements for production:

- [ ] Real backend API integration
- [ ] JWT token-based auth
- [ ] Refresh token mechanism
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Multi-factor authentication (MFA)
- [ ] Role-based access control (RBAC)
- [ ] Session timeout warnings
- [ ] Remember device option
- [ ] Social login (Google, GitHub, etc.)

## API Integration Points

When connecting to a real backend, modify these functions in `AuthContext.tsx`:

```typescript
// Replace demo login with API call
const login = async (username: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (response.ok) {
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('traceon_token', data.token);
    return true;
  }
  return false;
};

// Replace demo logout with API call
const logout = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  setUser(null);
  localStorage.removeItem('traceon_token');
  router.push('/landing');
};
```

## Troubleshooting

### "Cannot read property 'user' of undefined"
- Ensure `<AuthProvider>` wraps your app in `layout.tsx`
- Check that `useAuth()` is called inside a component wrapped by AuthProvider

### User gets logged out after page refresh
- Check browser console for localStorage errors
- Ensure localStorage is enabled in browser
- Check if browser is in private/incognito mode

### Redirect loop between login and dashboard
- Clear localStorage: `localStorage.clear()`
- Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
- Check that credentials are correct (test/test)

### Profile dropdown doesn't close
- Check that dropdown ref is properly attached
- Ensure click outside handler is working
- Check for z-index conflicts

## Summary

✅ **Complete authentication system implemented**
✅ **Login/Logout functionality working**
✅ **Protected routes configured**
✅ **Session persistence enabled**
✅ **Profile dropdown with logout added**
✅ **User info displayed correctly**
✅ **Theme integration complete**
✅ **Error handling in place**

The authentication system is fully functional and ready for use!
