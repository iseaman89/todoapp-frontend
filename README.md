
# TodoApp Frontend

Frontend for the Todo application built with **React + Vite**, served via **nginx** in production.

## Features

- React Hooks
- Axios API integration
- Authentication pages
- Todo CRUD UI

## Tech Stack

- React
- Vite
- Axios
- Docker + nginx

## Local Development

```
npm install
npm run dev
```

App runs at http://localhost:5173

## Production (Docker)

```
docker build -t todo-frontend .
docker run -p 5173:80 todo-frontend
```
