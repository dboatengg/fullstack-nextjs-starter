# Next.js Fullstack Starter

A fullstack web application built with Next.js 16, Prisma 7, and PostgreSQL. Features server-side rendering, type-safe database queries, and seamless Vercel deployment.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Prisma 7** - Type-safe ORM with PostgreSQL adapter
- **PostgreSQL** - Database (Vercel Postgres)
- **TypeScript** - Full type safety
- **React 19** - Server & Client Components

## Features

- ✅ Direct database queries in React Server Components
- ✅ Dynamic routing for blog posts
- ✅ Type-safe database operations with Prisma
- ✅ Hot reload support in development
- ✅ Production-ready Vercel deployment

## Getting Started

1. Clone and install dependencies:

```bash
   npm install
```

2. Set up environment variables:

```bash
   cp .env.example .env
   # Add your DATABASE_URL
```

3. Generate Prisma Client and run migrations:

```bash
   npx prisma generate
   npx prisma migrate dev
```

4. Start development server:

```bash
   npm run dev
```

## Database Schema

Simple blog structure with Users and Posts in a one-to-many relationship.
