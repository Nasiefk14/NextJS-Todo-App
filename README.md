# Todo App API

A simple REST API for managing a to-do list, built with **NestJS**, **MongoDB**, and **TypeScript**.

> **Heads up:** Despite the repo name, this is a **NestJS** backend — not a Next.js frontend.

---

## Table of Contents

- [What Does This Project Do?](#what-does-this-project-do)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Common Issues](#common-issues)

---

## What Does This Project Do?

This is a backend API that lets you **create**, **read**, **update**, and **delete** tasks (todos). You can also filter tasks by completion status and view completed tasks grouped by date.

There is **no frontend** — you interact with it through tools like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or plain `curl` in your terminal.

**Want to skip manual setup?** [Join the Postman team](https://app.getpostman.com/join-team?invite_code=392eca137de98a4d433adffc054ccb7b948f5b77371f81b860f7f429e4926ecf&target_code=adce931d712efce4f4ab8bce7af80849) to get a ready-made collection with all the API requests pre-configured.

There is **no authentication** — all endpoints are open and public.

---

## Tech Stack

| Tool | What It Does |
|------|-------------|
| [NestJS](https://nestjs.com/) | The web framework that handles requests and responses |
| [TypeScript](https://www.typescriptlang.org/) | Adds type safety on top of JavaScript |
| [MongoDB](https://www.mongodb.com/) | The database where tasks are stored |
| [Mongoose](https://mongoosejs.com/) | Talks to MongoDB from the app |
| [Zod](https://zod.dev/) | Validates incoming data (e.g. making sure a title isn't empty) |

---

## Prerequisites

Before you start, make sure you have these installed on your machine:

1. **Node.js** (v18 or higher) — [Download here](https://nodejs.org/)
   - Check with: `node -v`
2. **npm** (comes with Node.js)
   - Check with: `npm -v`
3. **MongoDB** — you need a running MongoDB instance. Pick one:
   - **Option A (easiest):** Create a free cloud database at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - **Option B:** Install MongoDB locally — [Instructions](https://www.mongodb.com/docs/manual/installation/)
   - **Option C:** Run MongoDB in Docker — `docker run -d -p 27017:27017 --name mongo mongo:latest`

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd NextJS-Todo-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Then open `.env` in your editor and set your MongoDB connection string (see [Environment Variables](#environment-variables) below).

### 4. Start the app

```bash
npm run start:dev
```

If everything worked, you should see output like:

```
[Nest] LOG [NestApplication] Nest application successfully started
```

The app is now running at **http://localhost:3000**.

### 5. Test it out

Open your browser and go to `http://localhost:3000` — you should see `Hello World!`.

---

## Environment Variables

| Variable | Required? | Default | Description |
|----------|-----------|---------|-------------|
| `MONGODB_URI` | **Yes** | — | Your MongoDB connection string |
| `PORT` | No | `3000` | The port the app runs on |

### Example values for `MONGODB_URI`

- **Local MongoDB:** `mongodb://localhost:27017/todo-app`
- **Docker MongoDB:** `mongodb://localhost:27017/todo-app`

---

## Running the App

| Command | What It Does |
|---------|-------------|
| `npm run start` | Starts the app once (no auto-reload) |
| `npm run start:dev` | Starts the app with auto-reload on file changes (use this for development) |
| `npm run start:debug` | Same as dev mode but with Node.js debugger attached |
| `npm run start:prod` | Runs the compiled production build from `dist/` |
| `npm run build` | Compiles TypeScript to JavaScript in the `dist/` folder |

---

## API Endpoints

The base URL is `http://localhost:3000` (unless you changed the `PORT`).

### Health Check

| Method | URL | What It Does |
|--------|-----|-------------|
| `GET` | `/` | Returns `"Hello World!"` — use this to check if the server is running |

### Tasks

All task endpoints live under `/api/tasks`.

| Method | URL | What It Does |
|--------|-----|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks?done=true` | Get only completed tasks |
| `GET` | `/api/tasks?done=false` | Get only incomplete tasks |
| `GET` | `/api/tasks/completed` | Get completed tasks grouped by date |
| `GET` | `/api/tasks/:id` | Get a single task by its ID |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Postman Collection

Don't want to type out requests manually? Join the Postman team to get a pre-built collection with every endpoint ready to go:

[Get the Postman Collection](https://app.getpostman.com/join-team?invite_code=392eca137de98a4d433adffc054ccb7b948f5b77371f81b860f7f429e4926ecf&target_code=adce931d712efce4f4ab8bce7af80849)

### Request & Response Examples

**Create a task:**

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

Response:

```json
{
  "id": "64a1b2c3d4e5f6a7b8c9d0e1",
  "title": "Buy groceries",
  "done": false,
  "createdAt": "2025-07-01T12:00:00.000Z",
  "completedAt": null
}
```

**Mark a task as done:**

```bash
curl -X PATCH http://localhost:3000/api/tasks/64a1b2c3d4e5f6a7b8c9d0e1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'
```

**Undo a completion (mark as not done):**

```bash
curl -X PATCH http://localhost:3000/api/tasks/64a1b2c3d4e5f6a7b8c9d0e1 \
  -H "Content-Type: application/json" \
  -d '{"done": false}'
```

This clears the `completedAt` date and moves the task back to incomplete.

**Delete a task:**

```bash
curl -X DELETE http://localhost:3000/api/tasks/64a1b2c3d4e5f6a7b8c9d0e1
```

Returns `204 No Content` on success, `404 Not Found` if the task doesn't exist.

---

## Running Tests

| Command | What It Does |
|---------|-------------|
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests and re-run on file changes |
| `npm run test:cov` | Run tests and generate a coverage report |
| `npm run test:e2e` | Run end-to-end tests (requires `MONGODB_URI` to be set) |

---

## Project Structure

```
src/
├── main.ts                          # App entry point — starts the server
├── app.module.ts                    # Root module — wires everything together
├── app.controller.ts                # Handles GET / (health check)
├── app.service.ts                   # Business logic for the root route
│
├── todos/
│   ├── todos.module.ts              # Wires up the todos feature
│   ├── todos.controller.ts          # Handles HTTP requests for /api/tasks
│   ├── todos.service.ts             # Business logic for tasks (DB queries)
│   └── schemas/
│       ├── todo.schema.ts           # Mongoose schema (what a task looks like in MongoDB)
│       └── todo.zod.ts              # Zod schemas (input validation rules)
│
└── zod-validation/
    └── zod-validation.pipe.ts       # Custom validation pipe
```

---

## Other Commands

| Command | What It Does |
|---------|-------------|
| `npm run format` | Auto-format code with Prettier |
| `npm run lint` | Lint code with ESLint and auto-fix issues |

---

## Common Issues

### "Cannot connect to MongoDB" / App crashes on startup

- Make sure MongoDB is running
- Double-check your `MONGODB_URI` in the `.env` file
- If using Atlas, make sure your IP address is whitelisted in the Atlas dashboard

### "Port 3000 is already in use"

Something else is using port 3000. Either:
- Stop the other process, or
- Change the `PORT` in your `.env` file to something else (e.g. `3001`)

### "Module not found" errors

Run `npm install` again — you might be missing dependencies.

---

## License

This project uses the [MIT License](https://opensource.org/licenses/MIT).
