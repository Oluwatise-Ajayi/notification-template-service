# Notification Template Service API

## Overview
This is a backend service built with NestJS and TypeScript for managing notification templates. It utilizes TypeORM for object-relational mapping with a PostgreSQL database and exposes a RESTful API for complete CRUD functionality.

## Features
- **NestJS**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- **TypeORM**: An ORM that can run in NodeJS and can be used with TypeScript and JavaScript.
- **PostgreSQL**: A powerful, open source object-relational database system.
- **Docker**: For containerizing the application and its database, ensuring consistent development and deployment environments.
- **Class Validator**: For robust and declarative validation of request payloads.
- **NestJS Terminus**: For implementing comprehensive application health checks.

## Getting Started
### Installation
There are two ways to run this project: using Docker (recommended) or setting it up locally.

**1. Using Docker**

This is the simplest way to get the service and its database running.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Oluwatise-Ajayi/notification-template-service.git
    cd notification-template-service
    ```

2.  **Build and run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```
    The API will be available at `http://localhost:3002`.

**2. Local Setup**

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Oluwatise-Ajayi/notification-template-service.git
    cd notification-template-service
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory and copy the contents from `.env.example`. Adjust the values for your local PostgreSQL instance.

4.  **Run the database**:
    Ensure you have a PostgreSQL instance running and accessible with the credentials provided in your `.env` file.

5.  **Start the application**:
    ```bash
    npm run start:dev
    ```
    The API will be available at `http://localhost:3002`.

### Environment Variables
The following environment variables are required. Create a `.env` file in the project root based on the `.env.example` file.

| Variable      | Description                           | Example                  |
| ------------- | ------------------------------------- | ------------------------ |
| `DB_HOST`     | Database host name                    | `localhost`              |
| `DB_PORT`     | Database port                         | `5433`                   |
| `DB_USERNAME` | Database username                     | `postgres`               |
| `DB_PASSWORD` | Database password                     | `postgres`               |
| `DB_DATABASE` | Database name                         | `template_service`       |
| `NODE_ENV`    | Application environment               | `development`            |
| `PORT`        | Port for the API server               | `3002`                   |

## API Documentation
### Base URL
`http://localhost:3002`

### Endpoints

#### POST /templates
Creates a new notification template.

**Request**:
```json
{
  "name": "user-welcome-email",
  "channel": "email",
  "subject": "Welcome to Our Platform!",
  "content": "<h1>Hello {{name}}!</h1><p>Click here: {{link}}<p>Welcome and thank you for signing up.</p>",
  "variables": ["user_name"],
  "language": "en-US",
  "version": 1,
  "is_active": true
}
```

**Response**:
```json
{
    "success": true,
    "data": {
        "name": "user-welcome-email",
        "channel": "email",
        "subject": "Welcome to Our Platform!",
        "content": "<h1>Hello {{name}}!</h1><p>Click here: {{link}}</h1><p>Welcome and thank you for signing up.</p>",
        "variables": ["user_name"],
        "language": "en-US",
        "version": 1,
        "is_active": true,
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "created_at": "2024-05-21T10:00:00.000Z",
        "updated_at": "2024-05-21T10:00:00.000Z"
    },
    "message": "Template created successfully"
}
```

**Errors**:
- `400 Bad Request`: Validation error. The request body does not match the required schema.

#### GET /templates
Retrieves a paginated list of all active templates. Supports query parameters for pagination.

**Request**:
Query Parameters:
- `page` (optional, number, default: 1): The page number to retrieve.
- `limit` (optional, number, default: 10, max: 100): The number of items per page.

Example: `/templates?page=1&limit=5`

**Response**:
```json
{
    "success": true,
    "data": [
        {
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "name": "user-welcome-email",
            "channel": "email",
            "subject": "Welcome to Our Platform!",
            "content": "<h1>Hello {{name}}!</h1><p>Click here: {{link}}<p>Welcome and thank you for signing up.</p>",
            "variables": ["user_name"],
            "language": "en-US",
            "version": 1,
            "is_active": true,
            "created_at": "2024-05-21T10:00:00.000Z",
            "updated_at": "2024-05-21T10:00:00.000Z"
        }
    ],
    "message": "Templates retrieved successfully",
    "meta": {
        "total": 1,
        "limit": 10,
        "page": 1,
        "total_pages": 1,
        "has_next": false,
        "has_previous": false
    }
}
```

**Errors**:
- None specific to this endpoint.

#### GET /templates/:id
Retrieves a single template by its UUID.

**Request**:
Path Parameter:
- `id`: The UUID of the template.

**Response**:
```json
{
    "success": true,
    "data": {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "name": "user-welcome-email",
        "channel": "email",
        "subject": "Welcome to Our Platform!",
        "content": "<h1>Hello {{name}}!</h1><p>Click here: {{link}}<p>Welcome and thank you for signing up.</p>",
        "variables": ["user_name"],
        "language": "en-US",
        "version": 1,
        "is_active": true,
        "created_at": "2024-05-21T10:00:00.000Z",
        "updated_at": "2024-05-21T10:00:00.000Z"
    },
    "message": "Template retrieved successfully"
}
```

**Errors**:
- `404 Not Found`: `Template with ID [id] not found`

#### GET /templates/name/:name
Retrieves a single active template by its unique name.

**Request**:
Path Parameter:
- `name`: The unique name of the template (e.g., `user-welcome-email`).

**Response**:
```json
{
    "success": true,
    "data": {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "name": "user-welcome-email",
        "channel": "email",
        "subject": "Welcome to Our Platform!",
        "content": "<h1>Hello {{name}}!</h1><p>Click here: {{link}}<p>Welcome and thank you for signing up.</p>",
        "variables": ["user_name"],
        "language": "en-US",
        "version": 1,
        "is_active": true,
        "created_at": "2024-05-21T10:00:00.000Z",
        "updated_at": "2024-05-21T10:00:00.000Z"
    },
    "message": "Template retrieved successfully"
}
```

**Errors**:
- `404 Not Found`: `Template with name [name] not found`

#### PUT /templates/:id
Updates an existing template by its UUID.

**Request**:
Path Parameter:
- `id`: The UUID of the template to update.

Body (all fields are optional):
```json
{
  "subject": "A Warm Welcome to Our Platform!",
  "is_active": false
}
```

**Response**:
```json
{
    "success": true,
    "data": {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "name": "user-welcome-email",
        "channel": "email",
        "subject": "A Warm Welcome to Our Platform!",
        "content": "<h1>Hello {{name}}!</h1><p>Click here: {{link}}<p>Welcome and thank you for signing up.</p>",
        "variables": ["user_name"],
        "language": "en-US",
        "version": 1,
        "is_active": false,
        "created_at": "2024-05-21T10:00:00.000Z",
        "updated_at": "2024-05-21T10:05:00.000Z"
    },
    "message": "Template updated successfully"
}
```

**Errors**:
- `400 Bad Request`: Validation error in the request body.
- `404 Not Found`: `Template with ID [id] not found`.

#### DELETE /templates/:id
Deletes a template by its UUID.

**Request**:
Path Parameter:
- `id`: The UUID of the template to delete.

**Response**:
```json
{
    "success": true,
    "message": "Template deleted successfully"
}
```

**Errors**:
- `404 Not Found`: `Template with ID [id] not found`.

#### GET /health
Performs a comprehensive health check of the service, including database connectivity, memory usage, and disk space.

**Request**:
No payload.

**Response**:
```json
{
    "status": "ok",
    "info": {
        "database": {
            "status": "up"
        },
        "memory_heap": {
            "status": "up"
        },
        "memory_rss": {
            "status": "up"
        },
        "storage": {
            "status": "up"
        }
    },
    "error": {},
    "details": {
        "database": {
            "status": "up"
        },
        "memory_heap": {
            "status": "up"
        },
        "memory_rss": {
            "status": "up"
        },
        "storage": {
            "status": "up"
        }
    }
}
```

**Errors**:
- `503 Service Unavailable`: One or more health checks failed.

#### GET /health/live
A simple liveness check to confirm the service process is running.

**Request**:
No payload.

**Response**:
```json
{
    "status": "ok",
    "info": {
        "liveness": {
            "status": "up"
        }
    },
    "error": {},
    "details": {
        "liveness": {
            "status": "up"
        }
    }
}
```

**Errors**:
- `503 Service Unavailable`: If the service is not running.

#### GET /health/ready
A readiness check to confirm the service is ready to accept traffic (e.g., the database is connected).

**Request**:
No payload.

**Response**:
```json
{
    "status": "ok",
    "info": {
        "database": {
            "status": "up"
        }
    },
    "error": {},
    "details": {
        "database": {
            "status": "up"
        }
    }
}
```

**Errors**:
- `503 Service Unavailable`: If the database connection check fails.