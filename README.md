# Jobs Tracker

A modern job application tracker built with Next.js, TypeScript, and Tailwind CSS.  
This repository contains the frontend MVP.

A separate backend using Node.js, Express, PostgreSQL, and Prisma is currently in progress.

---

## Demo

Deployment and screenshots will be added after backend 
---

## Features

- Add, edit, and delete job applications
- Search and filter by company, position, and status
- Mark jobs as favourite
- Notes for each job
- Responsive UI with modals
- LocalStorage persistence (temporary for MVP)
- Fully typed with TypeScript

---

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- React Hook Form
- Tailwind CSS

### Backend (Planned – separate repository)

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Authentication (JWT or sessions)

---

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/SufiyanMogal07/joblogs-frontend.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `src/app/` – Next.js routing and layouts
- `src/components/` – Reusable UI components
- `src/hooks/` – Custom React hooks
- `src/layout/` – Layout and navigation components
- `src/types/` – Shared TypeScript types
- `src/utils/` – Helper functions

---

## Backend (Planned)

The backend will be implemented as a separate Node.js and Express server with PostgreSQL and Prisma.  
It will expose REST APIs for job management and authentication.

Backend repository link will be added once available.

---

## Roadmap

- [x] Frontend MVP (localStorage-based)
- [ ] Backend API
- [ ] Authentication
- [ ] Frontend–backend integration
- [ ] Testing
- [ ] Deployment

---

## License

MIT
