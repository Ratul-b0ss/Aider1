# Testing the AiDER App

## Dev Server Setup

```bash
npm install
npm run dev
```

The Vite dev server starts on port 3000 by default (may auto-increment to 3001/3002 if ports are in use).

## App Architecture

The app uses state-based routing (no URL router). The `App.tsx` manages screen state and derives `authStatus` from the `user` object:
- `authStatus = 'guest'` when no user is logged in
- `authStatus = 'customer'` when user.role === 'customer'
- `authStatus = 'provider'` when user.role === 'provider'

## Mock Auth

The app uses mock authentication (no backend). Any valid email/password combination works:
- Email: must be valid format (e.g. `test@aider.com`)
- Password: must be at least 6 characters (e.g. `Test1234!`)
- Select "Customer" or "Provider" tab before submitting to control which role you log in as

## Testing the Three RBAC Views

### 1. Guest Landing (default)
- Navigate to the app root URL
- No login required - this is the default view
- Key elements: Dark green (#005B40) navbar with "AiDER" branding, IONOS-style hero with floating app icons, categories section, "How AiDER Works" dual-tab section

### 2. Customer Dashboard
- From Guest Landing, click "Log In" in navbar
- Ensure "Customer" tab is selected
- Enter any valid email/password and click "Login as customer"
- Key elements: Search-first header, category pills, recent activity, popular services, promo banner
- To log out: Click the avatar icon (top right) → Profile page → "Sign Out" button at bottom

### 3. Provider Dashboard
- From Guest Landing, click "Log In" in navbar
- Click "Provider" tab (the auth overlay should change to lime/yellow-green gradient)
- Enter any valid email/password and click "Login as provider"
- Key elements: Sidebar layout with "AiDER" + PRO badge, onboarding gate with progress bar, stats cards, recent bookings
- "Post Service" is LOCKED until onboarding is 100% complete
- To log out: Click "Sign Out" in the sidebar bottom

## Color Palette Reference

- Primary Dark Green: `#005B40`
- Accent Lime: `#D1F843`
- Background Light: `#ECF0EF`
- CTA Blue: `#1F8FE8`

## Build & Lint

```bash
npm run lint    # runs tsc --noEmit
npm run build   # runs vite build
```

Note: There are 2 pre-existing TS errors in `ProviderVerification.tsx` (key prop issue) that are unrelated to theme changes.

## Netlify Deployment

The app auto-deploys to Netlify on PR creation. Preview URLs follow the pattern: `https://deploy-preview-{PR_NUMBER}--aidern.netlify.app`
