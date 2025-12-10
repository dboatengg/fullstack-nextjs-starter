# Next.js Fullstack Starter

A fullstack web application built with Next.js 16, Prisma 7, and PostgreSQL. Features server-side rendering, type-safe database queries, and seamless Vercel deployment.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Prisma 7** - Type-safe ORM with PostgreSQL adapter
- **PostgreSQL** - Database (Vercel Postgres)
- **TypeScript** - Full type safety
- **React 19** - Server & Client Components
- **NextAuth v5** – Authentication (GitHub OAuth)

## Features

- Auth using NextAuth v5 (GitHub OAuth)
- Server Actions (signIn, signOut, publish draft, create post)
- Direct database queries inside Server Components
- Drafts + publishing workflow
- Dynamic routing for post detail pages
- Fully type-safe Prisma operations
- Responsive UI with Tailwind CSS
- Ready for one-click Vercel deployment

## Database Schema 

A minimal blog structure:

- **User**
- **Account / Session / VerificationToken (NextAuth models)**
- **Post** (draft or published)

Relationships:

- **One User → Many Posts**
- Only authors can publish their drafts

## Project Structure

```
app/
├─ api/
│ ├─ auth/[…nextauth]/route.ts → NextAuth handler
│ ├─ post/route.ts → Create post (POST)
│ ├─ publish/[id]/route.ts → Publish draft (PUT)
├─ create/page.tsx → Create new post
├─ drafts/page.tsx → User drafts
├─ p/[id]/DeleteButton.tsx
├─ p/[id]/PublishButton.tsx
├─ posts/[id]/page.tsx → Post detail page
components/
├─ CreatePostForm.tsx
├─ Header.tsx
lib/
├─ auth.ts
├─ prisma.ts
```

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
