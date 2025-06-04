# Admin Form Reap

A form builder full-stack app built with Next.js, Express, Prisma, and PostgreSQL.

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

### 5. Reset the Database (Optional)
To reset the main database (drops all data, reapplies all migrations, and runs the seed script):
```sh
docker-compose exec backend yarn prisma migrate reset --schema=apps/backend/prisma/schema.prisma --force
docker-compose exec db psql -U postgres -c "DROP DATABASE IF EXISTS db_test;"
docker-compose exec db psql -U postgres -c "CREATE DATABASE db_test;"
```

### 6. Seed the Database (Optional)
To seed the main database manually, run:
```sh
docker-compose exec backend yarn workspace backend prisma db seed --schema=apps/backend/prisma/schema.prisma
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

