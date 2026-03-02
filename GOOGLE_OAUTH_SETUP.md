# Google OAuth Setup Guide

## 🔐 Google Sign-In Configuration

To enable Google OAuth in your HirePrep application, follow these steps:

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

### 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "+ CREATE CREDENTIALS" > "OAuth 2.0 Client IDs"
3. Select "Web application" as the application type
4. Add authorized redirect URIs:
   - `http://localhost:3000` (development)
   - `http://127.0.0.1:3000` (development)
   - `https://your-domain.com` (production)
5. Save and copy the **Client ID**

### 3. Environment Configuration

#### Backend (.env file):
```bash
GOOGLE_CLIENT_ID=your-google-client-id-here
```

#### Frontend (.env.local file):
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Restart Services

After configuring the environment variables:
1. Restart the backend server
2. Restart the frontend development server
3. The Google Sign-In button will appear on the login page

### 5. Testing

1. Go to the login page
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected to the dashboard

## 🚨 Important Notes

- **Development Only**: This setup works for localhost development
- **Production**: Add your production domain to authorized redirect URIs
- **Security**: Never commit your Client ID to public repositories
- **Alternative**: Users can still login with username/password without OAuth

## 🔧 Troubleshooting

### "client_id is not found" Error
- Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in frontend
- Verify the Client ID matches exactly from Google Cloud Console
- Restart the frontend development server

### "redirect_uri_mismatch" Error
- Ensure the redirect URI is added to Google Cloud Console
- Check that the URI matches exactly (including http/https and port)

### "popup_closed_by_user" Error
- This is normal when users close the Google popup
- Not an application error

## 📱 Current Status

Without OAuth configuration:
- ✅ Username/password login works perfectly
- ✅ Employee login works perfectly
- ⚠️ Google Sign-In shows "Configure Google OAuth to enable" message

With OAuth configuration:
- ✅ All login methods work
- ✅ Seamless Google authentication
- ✅ Professional user experience
