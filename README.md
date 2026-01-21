# ToDo App - Frontend

A modern, responsive user interface for the ToDo application built with React and Vite.

## ✨ Features
- **User Authentication:** Sign up and Sign in pages.
- **Task Management:** Create, Read, Update, and Delete tasks.
- **Priority & Categories:** Organize tasks effectively.
- **Responsive Design:** Works on desktop and mobile.

## 🚀 Tech Stack
- **React** (Hooks, Context API/Redux).
- **Vite** for fast builds.
- **Axios** for API requests.
- **Tailwind CSS** for styling.

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18+)
- NPM or Yarn

### Configuration
Install dependencies:

  Bash
  npm install
  Start the development server:
  
  Bash
  npm run dev
  🐳 Docker Deployment
  The frontend is served using Nginx in the Docker environment.

Build: docker build -t todo-frontend.


Run: Access via port 5173 (mapped from Nginx port 80).
