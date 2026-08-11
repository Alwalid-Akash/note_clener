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

> Replace the frontend URL above with your actual Vercel deployment URL.

---

## 📸 Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Persistent login using localStorage
* Logout functionality

### 📝 Notes

* Create notes
* View personal notes
* Update notes
* Delete notes
* Notes belong to authenticated users
* Users can only access their own notes

### 🎨 Frontend

* React
* React Router
* Context API
* Axios
* Bootstrap 5
* Bootstrap Icons
* Responsive UI
* Protected frontend routes

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* JWT
* bcrypt
* CORS
* Middleware
* Centralized error handling

---

# 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │      Vite + React    │
                    └──────────┬───────────┘
                               │
                               │ Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Express Server    │
                    │       REST API       │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
          ┌───────────────┐         ┌───────────────┐
          │ JWT Middleware│         │   Controllers │
          └───────────────┘         └───────┬───────┘
                                            │
                                            ▼
                                    ┌───────────────┐
                                    │   Mongoose    │
                                    └───────┬───────┘
                                            │
                                            ▼
                                    ┌───────────────┐
                                    │    MongoDB    │
                                    └───────────────┘
```

---

# 📁 Project Structure

```text
notes-app/
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── noteController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validateMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Note.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── noteRoutes.js
│   │   │
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── context/
│   │   │   │   ├── AuthContext.jsx
│   │   │   │   └── NoteContext.jsx
│   │   │   │
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── EditNote.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

# 🔑 Authentication Flow

The application uses **JWT authentication**.

### Registration

```text
User
 ↓
Register Form
 ↓
POST /auth/register
 ↓
Validate User
 ↓
Hash Password with bcrypt
 ↓
Save User
 ↓
Generate JWT
 ↓
Return Token
 ↓
Store Token in localStorage
```

### Login

```text
User
 ↓
Login Form
 ↓
POST /auth/login
 ↓
Find User
 ↓
Compare Password
 ↓
Generate JWT
 ↓
Return Token
 ↓
Store Token
```

### Authenticated Request

```text
React
 ↓
Axios
 ↓
JWT Interceptor
 ↓
Authorization: Bearer <token>
 ↓
Express
 ↓
Authentication Middleware
 ↓
Verify JWT
 ↓
req.user
 ↓
Controller
 ↓
MongoDB
```

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

# 📝 Notes API

All note routes require authentication.

### Get Notes

```http
GET /notes
```

### Create Note

```http
POST /notes
```

Request:

```json
{
  "title": "Learn React",
  "description": "Study React hooks and Context API"
}
```

### Update Note

```http
PUT /notes/:id
```

### Delete Note

```http
DELETE /notes/:id
```

---

# 🔒 Authorization

Protected requests require:

```http
Authorization: Bearer <JWT_TOKEN>
```

The backend verifies the token before allowing access to notes.

Each note contains a reference to its owner:

```javascript
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
```

This ensures users can only access and modify their own notes.

---

# 🛠️ Technologies Used

## Frontend

| Technology      | Purpose                  |
| --------------- | ------------------------ |
| React           | UI development           |
| Vite            | Frontend build tool      |
| React Router    | Client-side routing      |
| Context API     | State management         |
| Axios           | API requests             |
| Bootstrap 5     | UI and responsive design |
| Bootstrap Icons | Icons                    |

## Backend

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | JavaScript runtime    |
| Express.js | REST API framework    |
| MongoDB    | Database              |
| Mongoose   | MongoDB ODM           |
| JWT        | Authentication        |
| bcrypt     | Password hashing      |
| CORS       | Cross-origin requests |

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

```bash
cd notes-app
```

---

# Backend Setup

Go to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
```

For local development:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🌍 Deployment

The application is designed to use separate frontend and backend deployments.

```text
React/Vite
    ↓
Vercel

Express/Node.js
    ↓
Render

MongoDB
    ↓
MongoDB Atlas
```

### Frontend

Deploy the `frontend` directory to Vercel.

Set:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend

Deploy the `backend` directory to Render.

Set environment variables:

```env
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Configure CORS to allow your Vercel frontend domain.

---

# 🔐 Environment Variables

Never commit `.env` files to GitHub.

### Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

### Frontend

```env
VITE_API_URL=
```

Add `.env` to `.gitignore`:

```gitignore
.env
.env.local
```

---

# 🧪 Testing the API

You can test the API using tools such as:

* Postman
* Thunder Client
* Insomnia

Example flow:

```text
1. Register
      ↓
2. Login
      ↓
3. Copy JWT
      ↓
4. Create Note
      ↓
5. Get Notes
      ↓
6. Update Note
      ↓
7. Delete Note
```

---

# 📚 What I Learned

This project helped me practice:

### Backend

* Building REST APIs
* Express routing
* CRUD operations
* MongoDB and Mongoose
* Controllers
* Middleware
* JWT authentication
* Password hashing
* Authorization
* User-specific resources
* CORS
* Environment variables
* Error handling

### Frontend

* React components
* React Hooks
* Context API
* React Router
* Protected routes
* Axios
* Axios interceptors
* JWT token handling
* localStorage
* Form handling
* Bootstrap responsive UI

### Deployment

* Git and GitHub
* Vercel
* Render
* MongoDB Atlas
* Environment variables
* Frontend/backend communication
* CORS configuration

---

# 🔮 Future Improvements

Planned improvements:

* [ ] Search notes
* [ ] Pagination
* [ ] Sort notes
* [ ] Categories/tags
* [ ] Note timestamps
* [ ] User profile
* [ ] Password reset
* [ ] Refresh tokens
* [ ] Toast notifications
* [ ] Dark mode
* [ ] API documentation with Swagger
* [ ] Automated testing
* [ ] Rate limiting
* [ ] Better error handling
* [ ] Production logging

---

# 🧠 Project Learning Path

This project was developed progressively:

```text
Phase 1
   ↓
Express + REST API
   ↓
Phase 2
   ↓
CRUD + Validation + Error Handling
   ↓
Phase 3
   ↓
React Frontend + Axios
   ↓
Phase 4
   ↓
JWT Authentication
   ↓
Protected Routes
   ↓
User-specific Notes
   ↓
Deployment
```

---

# 👨‍💻 Author

**Md Al Walid**

Master's Student in Web Engineering
Germany

GitHub:
https://github.com/Alwalid-Akash

---

# ⭐ If you like this project

Feel free to fork the repository, explore the code, and use it as a reference for learning full-stack development.

If you find it useful, consider giving the repository a ⭐.
