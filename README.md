# 🏠 HouseRental - RentEase

**RentEase** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that simplifies house rental management. It allows users to register as Renters, Owners, or Admins, enabling property listing, booking, and approval workflows.

---

## 🚀 Tech Stack

### Frontend:
- **React.js** with React Router
- **Bootstrap** + **Material UI** for styling
- **Axios** for API calls

### Backend:
- **Node.js** with Express.js
- **MongoDB** using Mongoose
- **JWT Authentication**

---

## 🔑 Features

### 👥 User Types
- **Renter**: Can view and book available properties.
- **Owner**: Can register and list rental properties (pending admin approval).
- **Admin**: Can approve/reject owner registrations and manage listings.

### 📦 Functionality
- User registration and login with role selection
- JWT-based authentication
- Property listing by owners
- Admin approval system for owner accounts
- Search, view, and book properties (by renters)
- Booking history

---

## 📁 Folder Structure
HouseRental/
│
├── backend/ # Node + Express + MongoDB
│ └── models, routes, controllers, etc.
│
├── frontend/ # React.js frontend
│ └── modules/common, user, admin, etc.
│
├── images/ # Property images
│
├── App.js
├── README.md
└── package.json

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/praveen-alva/HouseRental.git
cd HouseRental
### cd backend
npm install
npm run start
cd frontend
npm install
npm run start
git add README.md
git commit -m "Add project README"
git push

