# 📝 Notes App

A full-stack Notes Application built with **React, Node.js, Express, and MongoDB**.

The application allows users to register and log in securely, create personal notes, edit and delete notes, and manage their notes through a responsive web interface.

This project was built to practice real-world full-stack development concepts including **REST APIs, CRUD operations, JWT authentication, password hashing, protected routes, middleware, validation, centralized error handling, and frontend-backend integration**.

---

## 🚀 Live Demo

**Frontend:**
https://your-vercel-app.vercel.app

**Backend API:**
https://note-clener1.onrender.com

## ✨ Features

* 🔐 User registration and login
* 🔑 JWT-based authentication
* 🛡️ Protected routes
* 📝 Create, read, update, and delete notes
* 🔎 Search notes
* 🔒 Forgot password and password reset
* 🔐 Password hashing with bcrypt
* 👤 User-specific notes
* 🚪 Secure logout
* 📱 Responsive UI with Bootstrap 5
* ⚡ Axios API integration
* 🌐 RESTful API
* ☁️ Deployed frontend and backend

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Bootstrap 5
* Bootstrap Icons
* Axios
* Context API
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

## 🏗️ Architecture

```text
React Frontend
      │
      │ Axios / REST API
      ↓
Express.js Backend
      │
      ├── Authentication
      ├── Authorization
      ├── Notes CRUD
      └── Password Reset
      │
      ↓
MongoDB Atlas
```

## 📂 Project Structure

```text
notes-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔐 Authentication Flow

```text
Register / Login
       ↓
Backend validates credentials
       ↓
Password verified using bcrypt
       ↓
JWT generated
       ↓
JWT stored on client
       ↓
Protected API requests
       ↓
Backend verifies JWT
       ↓
User accesses their notes
```

## 🔑 Forgot Password Flow

```text
Forgot Password
       ↓
Enter email
       ↓
Backend generates reset token
       ↓
Reset link sent by email
       ↓
User opens reset link
       ↓
New password
       ↓
Password hashed with bcrypt
       ↓
Database updated
       ↓
User logs in
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| POST   | `/auth/register`              | Register a new user    |
| POST   | `/auth/login`                 | Login                  |
| POST   | `/auth/forgot-password`       | Request password reset |
| POST   | `/auth/reset-password/:token` | Reset password         |

### Notes

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/notes`     | Get user's notes |
| POST   | `/notes`     | Create a note    |
| PUT    | `/notes/:id` | Update a note    |
| DELETE | `/notes/:id` | Delete a note    |

## ⚙️ Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```


## 💻 Run Locally

### Clone repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## 🎯 What I Learned

Through this project, I practiced:

* Building a full-stack React application
* Designing REST APIs with Express
* JWT authentication and authorization
* Password hashing with bcrypt
* Protected React routes
* React Context API for global state
* CRUD API development
* MongoDB and Mongoose
* API integration using Axios
* CORS configuration
* Password reset and email-based authentication
* Environment variable management
* Frontend and backend deployment
* Connecting independently deployed services


 giving the repository a ⭐.
