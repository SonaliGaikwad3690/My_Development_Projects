# EMS React Frontend

This project replaces the old HTML/CSS/JavaScript frontend with React.

## Run

1. Open this folder in VS Code.
2. Make sure the Spring Boot backend is running on `http://localhost:8081`.
3. Run:

```bash
npm install
npm run dev
```

Vite normally starts on `http://localhost:5173`.

## Backend API

The React app uses the same endpoints from the existing EMS backend:
- `/api/users/login`
- `/api/users/register`
- `/api/users/profile/{username}`
- `/employees/getAll`
- `/employees/active`
- `/employees/inactive`
- `/employees/getSingle?id={id}`
- `/employees/register`
- `/employees/update/{id}`
- `/employees/toggle/{id}`
- `/api/holidays`
- `/api/holidays/active`
- `/api/holidays/inactive`
- `/api/holidays/{id}`
- `/api/holidays/{id}/status?status=0|1`

If Vite and Spring Boot run on different ports, configure a Vite proxy or enable CORS in Spring Boot.
