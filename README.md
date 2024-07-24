# Todo Project

This is a full-stack Todo application with a React frontend and Node.js backend.

## Project Structure

```
.
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── node_modules
│   ├── routes
│   ├── .env
│   ├── config.js
│   ├── generateToken.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── frontend
    └── todo-app
        ├── node_modules
        ├── public
        ├── src
        ├── package-lock.json
        ├── package.json
        └── README.md
```

## Setup and Installation

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Heroku CLI (if deploying to Heroku)
- Git

### Backend Setup

1. Navigate to the `backend` directory:

```sh
cd backend
```

2. Install the dependencies:

```sh
npm install
```

3. Create a `.env` file in the `backend` directory and add the following environment variables (You can also use generateToken.js to generate token):
  
```env
JWT_SECRET=your_secret
MONGODB_URI=your_mongodb_connection_string
```

4. Start the backend server:

```sh
npm start
```

### Frontend Setup

1. Navigate to the `frontend/todo-app` directory:

```sh
cd frontend/todo-app
```

2. Install the dependencies:

```sh
npm install
```

3. Start the frontend development server:

```sh
npm start
```

## API Endpoints

The following endpoints are available in the API:

- `POST /api/register` - Register a new user
- `POST /api/login` - Login a user
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task by ID
- `DELETE /api/tasks/:id` - Delete a task by ID

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- React
- Axios
- Bootstrap
