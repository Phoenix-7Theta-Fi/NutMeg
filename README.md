# Nutmeg - Ayurvedic Practitioners Blog

A MERN stack blogging platform specifically designed for Ayurvedic practitioners to share their knowledge and experiences.

## Features

- Create and view blog posts
- Modern, clean UI
- MongoDB Atlas integration
- RESTful API endpoints
- Responsive design

## Prerequisites

- Node.js
- MongoDB Atlas account
- npm or yarn

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

## Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

- GET /api/posts - Get all posts
- POST /api/posts - Create a new post
- GET /api/posts/:id - Get a specific post

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Axios
- Mongoose
