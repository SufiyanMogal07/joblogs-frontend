# JobLog - Job Application Tracker (Frontend)

JobLog is a full-stack job application tracker that helps job seekers organize applications, track interview progress, and manage their job search in one place.

This repository contains the frontend application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. The backend is maintained in a separate repository.

---

## Live Demo

🌐 https://joblogs.sufiyanmogal.me/

---

## Overview

Managing job applications across multiple job boards can quickly become difficult. JobLog provides a single place to manage applications, monitor progress, and keep important notes throughout the job search.

---

## Features

### Authentication

- User registration and login
- JWT authentication
- Protected routes

### Job Management

- Create, edit, and delete job applications
- Track application status
- Mark jobs as favourites
- Add notes to applications

### Dashboard

- Application overview
- Status distribution
- Interview tracking

### Search & Filtering

- Global search
- Quick filtering based on Job Status, Job Source
- Sort Based on Newest Added (default), Oldest Added, Recently Updated, Company A–Z, Company Z–A, Priority First

### User Experience

- Responsive design
- Form validation
- Loading and error states
- Fully typed with TypeScript

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Zustand
- React Hook Form

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication

### Database

- PostgreSQL
- Prisma ORM

### Deployment

- Vercel
- Render

---

## Architecture

```text
Next.js Frontend
       │
   REST API
       │
 Express.js Backend
       │
   Prisma ORM
       │
  PostgreSQL
```

---

## Project Structure

```text
src/
├── app/
├── components/
├── constants/
├── hooks/
├── lib/
├── services/
├── stores/
├── types/
└── utils/
```

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/SufiyanMogal07/joblogs-frontend.git
```

Install dependencies

```bash
pnpm install
```

Configure environment variables

```bash
cp .env.example .env
```

Start the development server

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

## What I Learned

Building JobLog helped me gain experience with:

- Structuring a production-style Next.js application
- Building reusable React components
- Managing global state with Zustand
- Integrating REST APIs
- Working with TypeScript across a larger codebase
- Building responsive dashboard interfaces
- Improving project organization as the application grew

---

## Future Development

Upcoming features and project decisions will be documented separately.

- `docs/FEATURES.md`
- `docs/DECISIONS.md`

---

## Backend Repository

https://github.com/SufiyanMogal07/joblogs-backend