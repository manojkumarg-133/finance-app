# Finance App

A personal finance tracking application built with Next.js 14, TypeScript, and Supabase.

## Features

- Track income, expenses, investments, and savings
- Categorize expenses (Housing, Transport, Health, Food, Education, Other)
- View financial trends with percentage changes
- Filter transactions by time periods (24 hours, 7 days, 30 days, 12 months)
- Dark/light mode with persistent theme
- Responsive design

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React

## Prerequisites

- Node.js 18+ 
- Supabase account and project

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the SQL function in your Supabase project:
   ```sql
   -- Execute the contents of lib/supabase/calculate-total.sql
   ```

5. Seed the database (optional):
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

### Transactions Table
- `id` - Primary key
- `amount` - Transaction amount (numeric)
- `type` - Transaction type (Income, Expense, Investment, Saving)
- `category` - Category (required for expenses)
- `description` - Optional description
- `created_at` - Timestamp

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme support
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Main application
│   │   ├── page.tsx       # Dashboard with trends and transaction list
│   │   ├── layout.tsx     # Dashboard layout with header/footer
│   │   ├── components/    # Dashboard-specific components
│   │   │   ├── transaction-list.tsx      # Server component fetching transactions
│   │   │   ├── transaction-form.tsx      # Client form with validation
│   │   │   ├── trend.tsx                 # Server component for trend calculations
│   │   │   └── range.tsx                 # Client component for time filtering
│   │   └── transaction/add/page.tsx      # Add transaction page
│   └── playground/        # Component showcase for development
├── components/            # Reusable UI components
│   ├── button.tsx         # Styled button with variants
│   ├── transaction-item.tsx              # Individual transaction display
│   ├── trend.tsx          # Base trend component
│   ├── dark-mode-toggle.tsx              # Theme switcher
│   └── [other UI components]
├── hooks/                 # Custom React hooks
│   ├── use-format-currency.ts            # Currency formatting
│   ├── use-dark-mode.ts   # Theme management with cookies
│   └── use-server-dark-mode.ts           # Server-side theme detection
├── lib/                   # Utilities and configurations
│   ├── actions.ts         # Server actions for form submissions
│   ├── types.ts           # TypeScript type definitions
│   ├── consts.ts          # Application constants (types, categories)
│   ├── validation.ts      # Zod schemas for form validation
│   ├── variants.ts        # UI component styling variants
│   └── supabase/
│       ├── server.ts      # Supabase client configuration
│       └── calculate-total.sql           # PostgreSQL function for calculations
```

## Code Architecture

### Server vs Client Components
- **Server Components**: Data fetching (`transaction-list.tsx`, `trend.tsx`)
- **Client Components**: User interactions (`transaction-form.tsx`, `range.tsx`, `dark-mode-toggle.tsx`)

### Data Flow
1. **Server Actions**: Form submissions processed via `lib/actions.ts`
2. **Database Queries**: Direct Supabase queries in server components
3. **Validation**: Zod schemas ensure type safety at runtime
4. **Cache Management**: `revalidatePath()` updates data after mutations

### Styling System
- **Tailwind CSS**: Utility-first styling with dark mode support
- **Component Variants**: Centralized styling in `lib/variants.ts`
- **Responsive Design**: Mobile-first approach throughout

### Type Safety
- **Full TypeScript**: All components and utilities are typed
- **Runtime Validation**: Zod schemas validate form data
- **Database Types**: Supabase integration with TypeScript

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run json-server` - Start JSON server (development fallback)
