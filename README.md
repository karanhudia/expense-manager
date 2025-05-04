# Expense Manager

A modern expense management application built with Next.js, TypeScript, and Prisma. This application allows users to track their expenses, manage reimbursements, and maintain a clear record of their financial transactions.

## Features

- 🔐 **User Authentication**
  - Secure login and registration
  - Company-based user management
  - Protected routes and API endpoints

- 💰 **Expense Management**
  - Add expenses with categories and remarks
  - Upload receipt images
  - Track pending reimbursements
  - View expense history
  - Edit and delete expenses
  - Mobile-friendly interface with bottom sheet for adding expenses

- 📱 **Responsive Design**
  - Mobile-first approach
  - Floating action button for mobile
  - Bottom sheet for adding/editing expenses
  - Clean and intuitive interface

- 🏢 **Company Integration**
  - Company-specific user accounts
  - Company-based expense tracking
  - Easy company switching

## Tech Stack

- **Frontend**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - React Context for state management

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL Database
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Environment variables (see `.env.example`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/expense-manager.git
   cd expense-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other settings.

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── expenses/         # Expense-related components
│   ├── forms/           # Form components
│   ├── providers/       # Context providers
│   └── ui/             # UI components
├── config/              # Configuration files
├── context/            # React context
├── lib/               # Utility functions
├── services/         # API service functions
└── types/           # TypeScript type definitions
```

## Features in Detail

### Authentication
- Secure user registration and login
- Protected routes and API endpoints
- Company-based user management
- Session management with cookies

### Expense Management
- Add expenses with:
  - Amount
  - Category (predefined options)
  - Remark (predefined options)
  - Date
  - Receipt image upload
- View expense history
- Edit existing expenses
- Delete expenses
- Track pending reimbursements

### Mobile Experience
- Floating action button for quick expense addition
- Bottom sheet for adding/editing expenses
- Swipe-to-dismiss functionality
- Responsive design for all screen sizes

## Authentication & Session Management

This app uses HTTP cookies to maintain user sessions securely. Here's how it works:

- **Login/Register:**
  - When a user logs in or registers, the backend sets a cookie named `user-email` containing the user's email address.
  - This cookie is set as `httpOnly`, `secure` (in production), `sameSite=lax`, and is scoped to the root path (`/`).
  - The cookie is set using Next.js API routes (`/api/auth/login` and `/api/auth/register`).

- **Session Validation:**
  - On each page load or API request that requires authentication, the backend checks for the presence of the `user-email` cookie.
  - If the cookie is present and valid, the user is considered authenticated and their session is active.
  - If the cookie is missing or invalid, the user is redirected to the login page or receives an unauthorized error.

- **Logout:**
  - When the user logs out, the backend clears the `user-email` cookie, ending the session.

- **Security:**
  - The cookie is `httpOnly` (not accessible via JavaScript), which helps prevent XSS attacks.
  - In production, the cookie is also set as `secure`, so it is only sent over HTTPS.

- **Usage in API Routes:**
  - All protected API routes (such as `/api/expenses`) check the `user-email` cookie to identify the current user and fetch or modify their data accordingly.

This approach provides a simple, secure, and stateless way to manage user sessions in a Next.js app.

## Progressive Web App (PWA) Support

This app is a Progressive Web App (PWA), which means you can install it on your Android (and iOS) device for a native app-like experience. Here's how it works and how it was set up:

### Features
- Installable on Android/iOS and desktop
- Launches in a standalone window with your app icon
- Custom splash screen and theme color
- Works offline for cached pages (basic offline support)

### How PWA is enabled
- Uses the [`next-pwa`](https://github.com/shadowwalker/next-pwa) plugin for Next.js
- Includes a `public/manifest.json` file with app name, icons, theme color, and description
- App icons are placed in `public/icons/` as `icon-192x192.png` and `icon-512x512.png`
- The manifest and icons are referenced in the app's `<head>` in `src/app/layout.tsx`:
  ```tsx
  <head>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#2563eb" />
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
  </head>
  ```
- PWA is only enabled in production builds

### How to use
1. Open the app in Chrome (or another PWA-supporting browser) on your phone or desktop
2. Open the browser menu and select "Add to Home screen"
3. The app will install and appear on your device with its icon
4. Launching from the home screen opens the app in a standalone window

You can customize the manifest, icons, and theme color to match your brand.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
