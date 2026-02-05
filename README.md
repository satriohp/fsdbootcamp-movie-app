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

## 🛠️ Tech Stack
**Frontend:**
- React.js (Vite)
- Redux Toolkit
- Axios (with Interceptors)
- Tailwind CSS

**Backend:**
- Node.js & Express
- Sequelize ORM
- Zod (Schema Validation)
- Bcrypt & JWT

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- NPM or Yarn

### 1. Database Setup
Sesuaikan konfigurasi database di `server/config/config.json`, lalu jalankan:
```bash
cd server
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
