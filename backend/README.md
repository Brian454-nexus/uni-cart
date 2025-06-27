# UniCart Backend (Flask)

This is the production-ready backend for the UniCart university marketplace.

## Features

- JWT authentication with university email verification
- Product CRUD, image upload (S3), category filtering, search
- Transactions and payments (Flutterwave)
- User profile and session management
- Email notifications (Celery)
- Secure, production-ready configuration
- API documentation (Swagger)
- Dockerized for easy deployment

## Project Structure

```
backend/
  app/
    __init__.py
    config.py
    models.py
    routes.py
    schemas.py
    services.py
    utils.py
    tasks.py
  migrations/
  tests/
  requirements.txt
  Dockerfile
  docker-compose.yml
  README.md
  wsgi.py
```

## Setup (Development)

1. Install Docker and Docker Compose
2. Copy `.env.example` to `.env` and set environment variables
3. Build and run:
   ```bash
   docker-compose up --build
   ```
4. The API will be available at `http://localhost:5000`

## Migrations

To create or apply migrations:

```bash
docker-compose exec backend flask db migrate
```

## Testing

```bash
docker-compose exec backend pytest
```

## API Docs

Visit `/apidocs` when the server is running.
