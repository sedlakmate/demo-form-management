# Admin Form Demo App
[![QA Workflow](https://github.com/szedlakmate/demo-form-management/actions/workflows/ci.yml/badge.svg)](https://github.com/szedlakmate/demo-form-management/actions/workflows/pr-qa.yml/badge.svg)

A form builder full-stack app built with Next.js, Express, Prisma, and PostgreSQL.

## Goal
The goal of this project is to create a simple form builder application that allows an admin user to create forms with sections and fields, and a public user to fill out these forms without needing to log in.

## Features
- Admin can create forms with multiple sections and fields.
- Admin can share a URL for the form.
- Public users can fill out the form without logging in.

## Considerations
- The project uses Docker for containerization to ensure a consistent development environment.
- The project uses Turbo for monorepo management to streamline development and build processes.
- The backend is built with Express.js and Prisma, using PostgreSQL as the database.
- The frontend is built with Next.js and Tailwind CSS.

## Code Quality
- The project uses ESLint and Prettier for code quality and formatting.
- The project uses TypeScript for type safety and a better developer experience.
- The project includes a few unit tests for the backend and Playwright end-to-end tests for the frontend. These are for demonstration purposes and are not exhaustive.
- The project uses GitHub Actions for continuous integration and deployment (CI/CD).

## Note
The project is complex with multiple components. Accomplishing it in the proposed time seemed impossible, so I implemented the core features within the time frame and added the nice-to-have features listed above as time allowed.

### Future Plans & TODO
- Add JSDoc comments to functions and classes.
- Complete API CRUD operations for forms, sections, and fields.
- Allow admin to edit forms, sections, and fields.
- Improve the UI/UX of the form builder and form-filling experience.
- Add live demo, deploy to Railway.
- Add more unit tests for the backend.
- Add frontend component tests.
- Add more end-to-end tests for the frontend.

## Deviations

### Token Management
Due to time constraints, for the sake of simplicity, the tokens for the forms are **automatically generated** and **not managed by the admin**.

## Project Setup

### Prerequisites
- Docker and Docker Compose
- Node.js
- Yarn
- Turbo (globally installed):
  ```sh
  yarn global add turbo
  ```

### 1. Environment Variables
- All required `.env` files are checked into the repository:
  - `apps/backend/.env`
  - `apps/backend/.env.test`
  - `apps/frontend/.env`

### 2. Start the Project with Docker Compose
This will start the database, backend, and frontend services:
```sh
docker-compose up -d
```

### 3. Run Database Migrations
Run migrations inside the backend container to set up the database schema:
```sh
docker-compose exec backend yarn prisma migrate dev --name init --schema=apps/backend/prisma/schema.prisma
```

### 4. Generate the Prisma Client
After running migrations, generate the Prisma client:
```sh
docker-compose exec backend yarn prisma generate --schema=apps/backend/prisma/schema.prisma
```

### 5. Seed the Database (Optional)
To seed the main database manually, run:
```sh
docker-compose exec backend yarn workspace backend prisma db seed --schema=apps/backend/prisma/schema.prisma
```

### RESET THE DATABASE
To reset the main database (drops all data, reapplies all migrations, and runs the seed script):
```sh
docker-compose exec backend yarn prisma migrate reset --schema=apps/backend/prisma/schema.prisma --force
docker-compose exec db psql -U postgres -c "DROP DATABASE IF EXISTS db_test;"
docker-compose exec db psql -U postgres -c "CREATE DATABASE db_test;"
```

### 7. Access the App
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)

### 8. Running Tests
To run tests with the correct environment:
```sh
turbo test
```

### 9. All-in-one Check
To run linting, type checking, and tests for all packages in one command:
```sh
turbo run check
```

## Database Credentials & Local Connection
You can connect to the PostgreSQL database using the following credentials:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db?schema=public"
```

## Automated Tests

### Unit Tests
To run unit tests for the backend and frontend, use:
```sh
turbo test
```

### Playwright E2E in Docker
To run Playwright end-to-end tests using Docker Compose (recommended):

```sh
docker-compose run --rm playwright
```

This will:
- Start the Playwright container with all dependencies and browsers
- Use Docker's internal networking to access your frontend and backend services
