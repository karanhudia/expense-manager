# Expense Manager Application

A Next.js application for managing expenses and reimbursements.

## Current Progress

### Implemented Components
- ✅ Reusable form components:
  - TextField
  - Dropdown
  - DatePicker
  - ImageUpload
- ✅ Configuration files:
  - Expense categories
  - Expense remarks
  - Companies
- ✅ Type definitions:
  - Expense types
  - User types

### Pending Implementation
- 🔄 Authentication System
  - User registration
  - Login functionality
  - Protected routes
- 🔄 Expense Management
  - Expense creation form
  - Expense list view
  - Expense editing
  - Image upload and download
- 🔄 Dashboard
  - Pending reimbursements summary
  - Monthly expense reports
  - Excel export functionality
- 🔄 API Routes
  - User authentication endpoints
  - Expense CRUD operations
  - Report generation

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── components/
│   ├── forms/         # Reusable form components
│   ├── ui/           # Shadcn UI components
│   └── layout/       # Layout components
├── config/           # Configuration files
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
└── app/              # Next.js app router
    ├── api/          # API routes
    └── auth/         # Authentication pages
```

## Dependencies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- date-fns
- lucide-react

## Features

- User authentication
- Expense tracking
- Image upload for receipts
- Monthly expense reports
- Excel export with images
- Responsive design
- Reusable components

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
