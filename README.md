# Cinema-App Fullstack (Mission Advance)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

A robust Fullstack Movie Management Application built with the PERN/MERN stack. This project implements industrial-grade data validation, secure authentication, and a scalable Atomic Design architecture.

---

## Key Features
- **Secure Authentication**: Password hashing using `Bcrypt` and `JWT` for session management.
- **Robust Validation**: Strict schema validation using `Zod` on both server and client request levels.
- **State Management**: Predictable state container using `Redux Toolkit (RTK)`.
- **Relational Database**: Managed with `Sequelize ORM` (Migrations, Models, and Seeders).
- **Responsive UI**: Built with `React` following the `Atomic Design` pattern.

---

## Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **State**: Redux Toolkit
- **HTTP Client**: Axios (with Interceptors for JWT)
- **Styling**: Tailwind CSS

### Backend
- **Runtime**: Node.js & Express
- **ORM**: Sequelize
- **Security**: Bcrypt, JSON Web Token (JWT)
- **Validation**: Zod Schema

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- NPM or Yarn

### 1. Database Setup
Sesuaikan konfigurasi database di `server/config/config.json`, lalu jalankan perintah ini di terminal folder `server`:
```bash
cd server
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Note: Jika ada issue ID unik, sinkronkan sequence menggunakan: SELECT setval(pg_get_serial_sequence('"Movies"', 'id'), coalesce(max(id),0) + 1, false) FROM "Movies";.

### 2. Backend Installation & Execution
```Bash
cd server
npm install
npm run dev # Server running on http://localhost:3000
```
### 3. Frontend Installation & Execution
```Bash
cd client
npm install
npm run dev # Vite running on http://localhost:5173
```

### Validation Example (Zod)
Integritas data dijaga ketat oleh schema.js:

JavaScript
```bash
const movieSchema = z.object({
  title: z.string().min(1),
  rating: z.coerce.number().min(0).max(10).default(0),
  src: z.string().url().optional().or(z.literal(''))
});
```
### Author
Satrio HP - GitHub Profile
