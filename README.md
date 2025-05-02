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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
