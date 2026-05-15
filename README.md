# 🛡️ VaultGuard - Secure Password Manager

> **ICA – 03 | Web Services and Technology (IT2234) | Level 2 IT**
>
> **Student Name:** `A.A.K.C.Abeysinghe`
> **GitHub:** [Chathuni16](https://github.com/Chathuni16/password-manager-api)

---

## 📌 Problem Description

In today's digital world, people manage dozens of online accounts across banking, social media, email, and work platforms. Most users either reuse weak passwords or forget them entirely, making their accounts vulnerable to security breaches.

**Target Users:** General internet users who struggle to manage multiple account credentials securely.

**Why This Matters:** Weak or reused passwords are the #1 cause of account takeovers. A secure, centralized password manager solves this by storing credentials safely under one authenticated account — so users only need to remember one master login.

---

## 💡 Proposed Solution

VaultGuard is a full-stack password manager that allows users to:
- Register and log in securely using JWT-based authentication
- Store, view, update, and delete their credentials safely
- Keep data fully isolated — each user can only access their own passwords
- Categorize passwords (Work, Social, Banking, etc.)
- Manage everything through a clean React.js frontend (Bonus)

---

## ✨ Features

- 🔐 User registration and login with hashed passwords (bcryptjs)
- 🪙 JWT-based authentication for all protected routes
- 📂 Full CRUD operations for password entries
- 🏷️ Category tagging for easy organization
- 👤 User-specific data isolation
- ⚠️ Proper error handling and input validation
- ⚛️ React.js frontend with responsive UI (Bonus)

---

## 🛠️ Technologies Used

| Layer             | Technology            |
|-------------------|-----------------------|
| Runtime           | Node.js               |
| Framework         | Express.js            |
| Database          | MongoDB + Mongoose    |
| Authentication    | JSON Web Tokens (JWT) |
| Password Hashing  | bcryptjs              |
| API Testing       | Postman               |
| Frontend (Bonus)  | React.js              |
| Version Control   | GitHub                |

---

## 📁 Folder Structure

```
password-manager-api/
│
├── controller/
│   ├── passwordController.js     # CRUD logic for password entries
│   └── userController.js         # Signup & Login logic
│
├── middleware/
│   └── authMiddleware.js         # JWT token verification
│
├── model/
│   ├── passwordEntries.js        # Password entry schema
│   └── userModel.js              # User schema
│
├── route/
│   ├── passwordRoute.js          # Password API routes
│   └── userRoute.js              # User API routes
│
├── client/                       # React.js frontend (Bonus)
│   └── src/
│       ├── addUser/
│       │   └── AddPassword.jsx
│       ├── getUser/
│       │   ├── Dashboard.jsx
│       │   └── PasswordTable.jsx
│       ├── login/
│       │   └── Login.jsx
│       ├── signup/
│       │   └── Signup.jsx
│       ├── navbar/
│       │   └── Navbar.jsx
│       ├── updateUser/
│       │   └── EditPassword.jsx
│       ├── App.js
│       └── App.css
│
├── .gitignore
├── index.js                      # Entry point
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### 👤 User Routes — `/api/user`

| Method | Endpoint           | Description                 | Auth Required |
|--------|--------------------|-----------------------------|---------------|
| POST   | `/api/user/signup` | Register a new user         | ❌            |
| POST   | `/api/user/login`  | Login and receive JWT token | ❌            |

**Signup — Request Body:**
```json
{
  "name": "Kavindi",
  "email": "kavindi@example.com",
  "password": "mypassword345"
}
```

**Signup — Response:**
```json
{
  "message": "User created successfully!"
}
```

**Login — Request Body:**
```json
{
  "email": "kavindi@example.com",
  "password": "mypassword345"
}
```

**Login — Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "message": "Login success"
}
```

---

### 🔑 Password Routes — `/api/passwords`

> ⚠️ All routes below require the `Authorization` header:
> ```
> Authorization: <your_jwt_token>
> ```

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| POST   | `/api/passwords/create`     | Add a new password entry             |
| GET    | `/api/passwords/getall`     | Get all passwords for logged-in user |
| GET    | `/api/passwords/getone/:id` | Get a single password entry by ID    |
| PUT    | `/api/passwords/update/:id` | Update a password entry by ID        |
| DELETE | `/api/passwords/delete/:id` | Delete a password entry by ID        |

**Create / Update — Request Body:**
```json
{
  "websiteName": "Facebook",
  "username": "kavindi@example.com",
  "password": "fb_password123",
  "category": "Social"
}
```

**Get All — Response:**
```json
[
  {
    "_id": "64abc123...",
    "websiteName": "Facebook",
    "username": "kavindi@example.com",
    "password": "fb_password123",
    "category": "Social",
    "userId": "64xyz456...",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+) installed
- MongoDB Atlas account or local MongoDB running
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/Chathuni16/password-manager-api.git
cd password-manager-api
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Create `.env` File
Create a `.env` file in the **root** of the project:
```env
PORT=8000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/passwordDB
JWT_SECRET=your_super_secret_key
```

### 4. Install Frontend Dependencies (Optional)
```bash
cd client
npm install
```

---

## ▶️ How to Run

### Run Backend
```bash
# From root folder
npm run dev
```
Backend runs at: `http://localhost:8000`

### Run Frontend (Optional)
```bash
cd client
npm start
```
Frontend runs at: `http://localhost:3000`

---

## 🧪 API Testing (Postman)

All endpoints were tested using **Postman**.

**Steps to test protected routes:**
1. Call `/api/user/login` and copy the token from the response
2. In Postman, go to the **Headers** tab
3. Add: `Authorization` → `<paste your token here>`
4. Send the request

---

## 🗄️ Database Models

### User Model
| Field    | Type            | Required |
|----------|-----------------|----------|
| name     | String          | ✅       |
| email    | String (unique) | ✅       |
| password | String (hashed) | ✅       |

### Password Entry Model
| Field       | Type                 | Required | Default     |
|-------------|----------------------|----------|-------------|
| websiteName | String               | ✅       |      -      |
| username    | String               | ✅       |      -      |
| password    | String               | ✅       |      -      |
| category    | String               | ❌       | `"General"` |
| userId      | ObjectId (ref: User) | ✅       |      -      |

---

## 📝 Important Notes

- Each user can **only** view, edit, or delete their **own** password entries
- Passwords are stored as-is in the database — in production, consider encrypting stored passwords too
- JWT tokens expire after **1 hour** — login again to get a new token
- Never share your `.env` file — it is listed in `.gitignore`

---

*Developed as part of ICA-03 | Web Services and Technology (IT2234) | Level 2 IT*
