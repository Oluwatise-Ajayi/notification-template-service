# **Notification Template Service API** 📧

## Overview
This is a robust microservice, engineered with **NestJS (TypeScript)** and **TypeORM**, designed to centralize and manage dynamic notification templates. It provides a flexible API for creating, retrieving, updating, and deleting templates across various communication channels, powered by a **PostgreSQL** database.

## Features
- **NestJS**: Leverages the powerful NestJS framework for building scalable and maintainable server-side applications with TypeScript.
- **TypeORM**: Utilizes TypeORM as the Object-Relational Mapper (ORM) for seamless and efficient database interactions with PostgreSQL.
- **PostgreSQL**: Employs PostgreSQL as a reliable and feature-rich relational database for persistent storage of notification templates.
- **Docker & Docker Compose**: Containerization for simplified setup, consistent environments, and streamlined deployment across development and production.
- **Comprehensive Health Checks**: Integrates `@nestjs/terminus` for detailed liveness, readiness, database, memory, and disk health monitoring.
- **Global Error Handling**: Implements a centralized `HttpExceptionFilter` for consistent and informative error responses across the API.
- **Standardized Response Interceptors**: Ensures all successful API responses adhere to a consistent structure, enhancing client-side predictability.
- **Correlation ID Middleware**: Automatically generates and assigns a correlation ID to each request for improved logging, tracing, and debugging.
- **Request Logging Middleware**: Provides structured logging of incoming requests and outgoing responses, aiding in monitoring and troubleshooting.
- **Data Validation (DTOs)**: Enforces strict input validation using `class-validator` and `class-transformer` with Data Transfer Objects (DTOs) for robust API input.
- **Pagination**: Supports efficient retrieval of large datasets with built-in pagination utilities, optimizing performance for list endpoints.

## Technologies Used

| Technology       | Description                                              | Link                                                   |
| :--------------- | :------------------------------------------------------- | :----------------------------------------------------- |
| Node.js          | JavaScript runtime environment                           | [nodejs.org](https://nodejs.org/)                      |
| NestJS           | Progressive Node.js framework for building efficient, scalable Node.js server-side applications. | [nestjs.com](https://nestjs.com/)                      |
| TypeScript       | Superset of JavaScript that adds static typing           | [typescriptlang.org](https://www.typescriptlang.org/)  |
| TypeORM          | ORM for TypeScript and JavaScript                        | [typeorm.io](https://typeorm.io/)                      |
| PostgreSQL       | Powerful, open-source relational database                | [postgresql.org](https://www.postgresql.org/)          |
| Docker           | Containerization platform                                | [docker.com](https://www.docker.com/)                  |
| `class-validator` | Validation decorators for classes                        | [github.com/typestack/class-validator](https://github.com/typestack/class-validator) |
| `class-transformer` | Decorators to transform plain objects to class instances | [github.com/typestack/class-transformer](https://github.com/typestack/class-transformer) |
| `@nestjs/terminus` | Health check module for NestJS                           | [docs.nestjs.com/recipes/health-checks](https://docs.nestjs.com/recipes/health-checks) |

## Getting Started
To get this service up and running for development or testing, follow these simple steps.

### Installation
🚀 First, clone the repository to your local machine:
```bash
git clone https://github.com/Oluwatise-Ajayi/notification-template-service.git
cd notification-template-service
```

📦 To set up the application and its PostgreSQL database using Docker Compose:
```bash
docker-compose up --build
```
This command will build the Docker images, start the `template-db` and `template-service` containers, and expose the API on `http://localhost:3002`.

If you prefer to run the application locally without Docker for the application itself (assuming a local PostgreSQL is already running or set up):
```bash
npm install
npm run start:dev
```

### Environment Variables
The application requires specific environment variables for configuration, particularly for database connection and port. Create a `.env` file in the root directory, modeled after `.env.example`, and populate it with your settings.

| Variable        | Description                           | Example Value      |
| :-------------- | :------------------------------------ | :----------------- |
| `DB_HOST`       | Database host address                 | `localhost` (or `template-db` if using Docker Compose) |
| `DB_PORT`       | Database port                         | `5433` (or `5432` if using Docker Compose) |
| `DB_USERNAME`   | Database user                         | `postgres`         |
| `DB_PASSWORD`   | Database password                     | `postgres`         |
| `DB_DATABASE`   | Name of the database                  | `template_service` |
| `NODE_ENV`      | Node.js environment (`development`, `production`, `test`) | `development` |
| `PORT`          | Port the application will listen on   | `3002`             |

## API Documentation
This section details the available endpoints, their expected request formats, and typical responses.

### Base URL
`http://localhost:3002`

### Endpoints

#### GET /health
**Description**: Performs a comprehensive health check on the service, including database connection, memory usage (heap, RSS), and disk storage.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "info": {
      "database": { "status": "up" },
      "memory_heap": { "status": "up" },
      "memory_rss": { "status": "up" },
      "storage": { "status": "up" }
    },
    "error": {},
    "details": {
      "database": { "status": "up" },
      "memory_heap": { "status": "up" },
      "memory_rss": { "status": "up" },
      "storage": { "status": "up" }
    }
  },
  "message": "Operation successful"
}
```

**Errors**:
- `500 Internal Server Error`: If any health indicator fails.

#### GET /health/live
**Description**: A simple liveness check to determine if the service is running.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "info": {
      "liveness": { "status": "up" }
    },
    "error": {},
    "details": {
      "liveness": { "status": "up" }
    }
  },
  "message": "Operation successful"
}
```

**Errors**:
- `500 Internal Server Error`: If the service is not responsive.

#### GET /health/ready
**Description**: A readiness check to determine if the service is ready to accept traffic, primarily checking the database connection.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "info": {
      "database": { "status": "up" }
    },
    "error": {},
    "details": {
      "database": { "status": "up" }
    }
  },
  "message": "Operation successful"
}
```

**Errors**:
- `500 Internal Server Error`: If the database connection is down.

#### POST /templates
**Description**: Creates a new notification template.

**Request**:
```json
{
  "template_name": "welcome_email",
  "channel_type": "email",
  "template_subject": "Welcome to Our Service!",
  "template_content": "Hello {{user_name}}, welcome to our service. Your order {{order_id}} has been placed.",
  "template_variables": ["user_name", "order_id"],
  "template_language": "en",
  "template_version": 1,
  "is_active": true
}
```
**Required fields**: `template_name`, `channel_type` (`email` or `push`), `template_content`.

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "template_name": "welcome_email",
    "channel_type": "email",
    "template_subject": "Welcome to Our Service!",
    "template_content": "Hello {{user_name}}, welcome to our service. Your order {{order_id}} has been placed.",
    "template_variables": ["user_name", "order_id"],
    "template_language": "en",
    "template_version": 1,
    "is_active": true,
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:00:00.000Z"
  },
  "message": "Template created successfully"
}
```

**Errors**:
- `400 Bad Request`: If validation fails (e.g., missing required fields, invalid `channel_type`).
- `500 Internal Server Error`: If an unexpected server error occurs.

#### GET /templates
**Description**: Retrieves a paginated list of active notification templates.

**Request**:
Query Parameters:
- `page` (optional): Page number (default: 1, min: 1)
- `limit` (optional): Number of items per page (default: 10, min: 1, max: 100)

**Example**: `GET /templates?page=2&limit=5`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "b1c2d3e4-f5a6-7890-1234-567890abcdef",
      "template_name": "order_confirmation",
      "channel_type": "email",
      "template_subject": "Order #{{order_id}} Confirmed",
      "template_content": "Your order with ID {{order_id}} has been confirmed.",
      "template_variables": ["order_id"],
      "template_language": "en",
      "template_version": 1,
      "is_active": true,
      "created_at": "2023-10-26T14:30:00.000Z",
      "updated_at": "2023-10-26T14:30:00.000Z"
    }
  ],
  "message": "Templates retrieved successfully",
  "meta": {
    "total": 15,
    "limit": 10,
    "page": 1,
    "total_pages": 2,
    "has_next": true,
    "has_previous": false
  }
}
```

**Errors**:
- `400 Bad Request`: If pagination query parameters are invalid.
- `500 Internal Server Error`: If an unexpected server error occurs.

#### GET /templates/name/:template_name
**Description**: Retrieves a single notification template by its unique name.

**Request**:
Path Parameter:
- `template_name`: The unique name of the template.

**Example**: `GET /templates/name/welcome_email`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "template_name": "welcome_email",
    "channel_type": "email",
    "template_subject": "Welcome to Our Service!",
    "template_content": "Hello {{user_name}}, welcome to our service. Your order {{order_id}} has been placed.",
    "template_variables": ["user_name", "order_id"],
    "template_language": "en",
    "template_version": 1,
    "is_active": true,
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:00:00.000Z"
  },
  "message": "Template retrieved successfully"
}
```

**Errors**:
- `404 Not Found`: If a template with the given `template_name` does not exist or is inactive.
- `500 Internal Server Error`: If an unexpected server error occurs.

#### GET /templates/:id
**Description**: Retrieves a single notification template by its UUID.

**Request**:
Path Parameter:
- `id`: The UUID of the template.

**Example**: `GET /templates/a1b2c3d4-e5f6-7890-1234-567890abcdef`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "template_name": "welcome_email",
    "channel_type": "email",
    "template_subject": "Welcome to Our Service!",
    "template_content": "Hello {{user_name}}, welcome to our service. Your order {{order_id}} has been placed.",
    "template_variables": ["user_name", "order_id"],
    "template_language": "en",
    "template_version": 1,
    "is_active": true,
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:00:00.000Z"
  },
  "message": "Template retrieved successfully"
}
```

**Errors**:
- `404 Not Found`: If a template with the given `id` does not exist.
- `500 Internal Server Error`: If an unexpected server error occurs.

#### PUT /templates/:id
**Description**: Updates an existing notification template by its UUID.

**Request**:
Path Parameter:
- `id`: The UUID of the template to update.

Payload: (Partial `CreateTemplateDto`)
```json
{
  "template_subject": "Updated Welcome Message",
  "template_content": "Hello {{user_name}}, welcome back! Here's an update on {{order_id}}.",
  "template_variables": ["user_name", "order_id", "status"],
  "is_active": false
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "template_name": "welcome_email",
    "channel_type": "email",
    "template_subject": "Updated Welcome Message",
    "template_content": "Hello {{user_name}}, welcome back! Here's an update on {{order_id}}.",
    "template_variables": ["user_name", "order_id", "status"],
    "template_language": "en",
    "template_version": 1,
    "is_active": false,
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:30:00.000Z"
  },
  "message": "Template updated successfully"
}
```

**Errors**:
- `400 Bad Request`: If validation fails for provided fields.
- `404 Not Found`: If a template with the given `id` does not exist.
- `500 Internal Server Error`: If an unexpected server error occurs.

#### DELETE /templates/:id
**Description**: Deletes a notification template by its UUID.

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
- `404 Not Found`: If a template with the given `id` does not exist.
- `500 Internal Server Error`: If an unexpected server error occurs.

## Usage
Once the service is running (either via Docker Compose or locally), you can interact with the API using any HTTP client (e.g., Postman, cURL, Insomnia) at the base URL `http://localhost:3002`. Refer to the API Documentation section for detailed endpoint usage.

## Contributing
We welcome contributions to enhance this Notification Template Service! ✨

To contribute:
1.  **Fork** the repository.
2.  **Create** a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  **Implement** your changes, ensuring they adhere to the project's coding standards.
4.  **Write** comprehensive tests for your changes.
5.  **Commit** your changes with clear and descriptive messages.
6.  **Push** your branch to your forked repository.
7.  **Open** a Pull Request to the `main` branch of this repository, describing your changes in detail.

## License
This project is currently UNLICENSED, as specified in `package.json`.

## Author Info

| Role      | Name           | LinkedIn                         | Twitter                          |
| :-------- | :------------- | :------------------------------- | :------------------------------- |
| Developer | Oluwatise Ajayi | [LinkedIn](https://linkedin.com/in/oluwatiseajayi) | [Twitter](https://twitter.com/oluwatiseajayi) |
| Developer | Your Name Here | [LinkedIn](YOUR_LINKEDIN_PROFILE) | [Twitter](YOUR_TWITTER_HANDLE)   |

---
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11+-red?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3.x-orange?logo=typeorm&logoColor=white)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker&logoColor=white)](https://www.docker.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/Oluwatise-Ajayi/notification-template-service/actions)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)