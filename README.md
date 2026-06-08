# JobLog - Jobs Application Tracker (Frontend)

The frontend of JobLog — a full-stack job application tracker.
This repository contains only the frontend built with Next.js, TypeScript, and Tailwind CSS.

---

[Live Demo](https://joblogs.sufiyanmogal.me/)

---

## Problem It Solves

During my own job search, I had no way to track how many jobs I had applied to, which companies hadn't responded, or whether my resume was actually working. JobLog is a personal digital diary for your job search — so you always know where you stand and what to improve.

---

## Features

- Jobs Metrics and Graphs
- Add, edit, and delete job applications
- Global Search by company name or position
- Mark jobs as favourite
- Notes for each job
- Responsive UI with modals
- Fully typed with TypeScript

---

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- React Hook Form
- Zustand
- Tailwind CSS

### Backend (Planned – separate repository)

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Authentication (JWT)

---

## Getting Started

1. Clone the repository

```bash
   git clone https://github.com/SufiyanMogal07/joblogs-frontend.git
```

2. Ensure you have Node.js 20+ installed

   Download from [nodejs.org](https://nodejs.org/) or use a version manager like `nvm`:

```bash
   nvm install 20
   nvm use 20
```

3. Install pnpm package from npm

```bash
   npm install -g pnpm
```

4. Install dependencies

```bash
   pnpm install
```

5. Set up environment variables

```bash
   cp .env.example .env
```

6. Start the development server

```bash
   pnpm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `src/app/` – Next.js routing and layouts

- `src/components/` – Reusable UI components

- `src/constants/` – App-wide constants (status types, dropdown options, config values)

- `src/hooks/` – Custom React hooks

- `src/lib/` – Third-party library configs (e.g. axios instance, query client setup)

- `src/services/` – API service functions for backend communication

- `src/types/` – Shared TypeScript types and interfaces

- `src/utils/` – Helper/utility functions

- `src/.proxy.ts` – Dev proxy configuration for API routing

---

## Backend

The backend is ready as separate Node.js and Express server with PostgreSQL and Prisma.
It will expose REST APIs for job management and authentication.

### [Backend Repository](https://github.com/SufiyanMogal07/joblogs-backend)

---

## Roadmap

### Phase 1 — Foundation

- [x] Frontend UI
- [x] Backend API
- [x] Authentication
- [x] Frontend–backend integration
- [x] Frontend improvement
- [ ] Resume upload (single resume, basic)
- [ ] JD vs Resume match — basic keyword comparison
- [ ] Testing
- [ ] Deployment

### Phase 2 — Resume Intelligence

- [ ] Multiple resume versions (up to 4, role-based labels)
- [ ] Resume linked to each job application
- [ ] Advanced JD vs Resume analyzer (match score + missing keywords + suggestions)
- [ ] Auto resume suggestion when adding a new job
- [ ] Resume performance score (which resume gets most interviews/offers)
- [ ] Resume update suggestions based on JD keywords
- [ ] Auto-ghosted detection (no response after 30 days)
- [ ] Enhanced interview notes per job

### Phase 3 — Growth & Automation

- [ ] Browser extension for one-click job capture from any job board
- [ ] Notifications and follow-up reminders
- [ ] Resume template recommendations based on role and profile
- [ ] AI-powered cover letter generator from JD + resume
- [ ] Job application analytics dashboard (response rate, offer trends)

---

## What I Learned

- Architecting a production-grade frontend with Next.js App Router and TypeScript
- Managing complex client-side state with Zustand across a large feature set
- Building a scalable component structure with reusability in mind
- Integrating a REST API with proper error handling and loading states
- Improving UI/UX through iteration — responsiveness, modals, and accessibility
- Strengthening Git workflow and project organization practices

---
