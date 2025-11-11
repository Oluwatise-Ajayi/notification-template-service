# Notification Template Service API 🔔

## Overview
The Notification Template Service is a robust microservice built with NestJS and TypeScript, powered by TypeORM and PostgreSQL, designed to centralize and manage notification templates across various communication channels. It provides a flexible API for creating, retrieving, updating, and deleting templates, ensuring consistency and reusability in notification delivery.

## Features
- **NestJS Framework**: Provides a scalable, maintainable, and enterprise-grade backend architecture.
- **TypeScript**: Ensures type safety and improves code quality and developer experience.
- **TypeORM**: Offers powerful ORM capabilities for seamless interaction with the PostgreSQL database.
- **PostgreSQL**: A reliable and feature-rich relational database for persistent storage of template data.
- **Docker & Docker Compose**: Facilitates easy setup and deployment in containerized environments.
- **Terminus (Health Checks)**: Integrates robust health checks for liveness, readiness, database connectivity, memory, and disk usage.
- **Class-Validator & Class-Transformer**: Enables declarative validation and transformation of DTOs for incoming requests.
- **Correlation ID Middleware**: Implements request tracking for distributed logging and debugging.
- **Global Exception Handling**: Standardizes error responses across the API.
- **Automated Template Seeding**: Populates the database with default templates upon application startup.
- **Pagination**: Supports efficient retrieval of large sets of templates.

## Getting Started
To get the Notification Template Service up and running locally, follow these steps.

### Installation

1.  👯‍♀️ **Clone the Repository**:
    ```bash
    git clone https://github.com/Oluwatise-Ajayi/notification-template-service.git
    cd notification-template-service
    ```

2.  🐳 **Using Docker (Recommended for quick setup)**:
    Ensure you have Docker and Docker Compose installed.
    ```bash
    docker-compose up --build -d
    ```
    This will build the service image, start the PostgreSQL database, and run the Notification Template Service.

3.  💻 **Local Development Setup**:
    If you prefer to run it directly on your machine:

    *   Install Node.js (v18 or higher) and npm.
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Set up a PostgreSQL database and update your `.env` file with the connection details.
    *   Run the application in development mode:
        ```bash
        npm run start:dev
        ```
    *   For production:
        ```bash
        npm run build
        npm run start:prod
        ```

### Environment Variables
The service requires the following environment variables. Create a `.env` file in the project root based on `.env.example`:

```example
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=template_service
NODE_ENV=development
PORT=3002
```

## Core Capabilities
This service offers a comprehensive solution for managing notification templates, enabling dynamic content generation and multi-channel delivery.

*   **Flexible Template Creation**: Define templates for various channels (email, push) with dynamic variables.
*   **Centralized Template Store**: Maintain all notification templates in a single, accessible repository.
*   **Version Control**: Manage template versions and easily activate/deactivate templates.
*   **Multi-language Support**: Design templates for different languages.
*   **Developer-Friendly API**: Interact with templates using intuitive RESTful endpoints.

## Usage Examples
Once the service is running, you can interact with it via its API. Here are a few examples using `curl`.

The service will be accessible at `http://localhost:3002` (or your configured `PORT`).

### Create a New Template
```bash
curl -X POST http://localhost:3002/templates \
-H "Content-Type: application/json" \
-d '{
    "template_name": "welcome-email",
    "channel_type": "email",
    "template_subject": "Welcome, {{user_name}}!",
    "template_content": "<p>Hello {{user_name}}, welcome to our service! We are glad to have you.</p><p>Your account ID is {{account_id}}.</p>",
    "template_variables": ["user_name", "account_id"],
    "template_language": "en",
    "is_active": true
}'
```

### Retrieve All Templates
```bash
curl http://localhost:3002/templates?page=1&limit=5
```

### Retrieve a Template by Name
```bash
curl http://localhost:3002/templates/name/welcome-email
```

### Update an Existing Template
```bash
# Assuming 'some-uuid-id' is the ID of the template you want to update
curl -X PUT http://localhost:3002/templates/some-uuid-id \
-H "Content-Type: application/json" \
-d '{
    "template_subject": "Welcome Aboard, {{user_name}}!",
    "template_version": 2
}'
```

## API Documentation

### Base URL
`http://localhost:3002` (or your configured `PORT`)

### Endpoints

#### GET /health
Retrieves the overall health status of the service, including database, memory, and disk usage.

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
      "storage": { "status": "up" },
      "liveness": { "status": "up" }
    },
    "error": {},
    "details": {
      "database": { "status": "up" },
      "memory_heap": { "status": "up" },
      "memory_rss": { "status": "up" },
      "storage": { "status": "up" },
      "liveness": { "status": "up" }
    }
  },
  "message": "Operation successful"
}
```

**Errors**:
- `500 Internal Server Error`: If any health indicator fails.

#### GET /health/live
Performs a simple liveness check to confirm the service is running.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "info": { "liveness": { "status": "up" } },
    "error": {},
    "details": { "liveness": { "status": "up" } }
  },
  "message": "Operation successful"
}
```

**Errors**:
- `500 Internal Server Error`: If the service is not responsive.

#### GET /health/ready
Performs a readiness check, typically confirming critical dependencies like the database are available.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "info": { "database": { "status": "up" } },
    "error": {},
    "details": { "database": { "status": "up" } }
  },
  "message": "Operation successful"
}
```

**Errors**:
- `500 Internal Server Error`: If the database connection fails.

#### POST /templates
Creates a new notification template in the database.

**Request**:
```json
{
  "template_name": "welcome-onboarding",
  "channel_type": "email",
  "template_subject": "Welcome to Our Platform, {{username}}!",
  "template_content": "<p>Hello {{username}},</p><p>Thank you for joining. Your onboarding process starts now!</p>",
  "template_variables": ["username"],
  "template_language": "en",
  "template_version": 1,
  "is_active": true
}
```
**Required fields**: `template_name`, `channel_type`, `template_content`.

**Response**:
```json
{
  "success": true,
  "data": {
    "template_name": "welcome-onboarding",
    "channel_type": "email",
    "template_subject": "Welcome to Our Platform, {{username}}!",
    "template_content": "<p>Hello {{username}},</p><p>Thank you for joining. Your onboarding process starts now!</p>",
    "template_variables": ["username"],
    "template_language": "en",
    "template_version": 1,
    "is_active": true,
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:00:00.000Z"
  },
  "message": "Template created successfully"
}
```

**Errors**:
- `400 Bad Request`: If request payload is invalid or missing required fields.
- `409 Conflict`: If `template_name` already exists (as it's unique).
- `500 Internal Server Error`: For unexpected server issues.

#### GET /templates
Retrieves a paginated list of active notification templates.

**Request**:
**Query Parameters**:
- `page` (optional): `number`, default `1`.
- `limit` (optional): `number`, default `10`, max `100`.

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "template_name": "welcome-onboarding",
      "channel_type": "email",
      "template_subject": "Welcome to Our Platform, {{username}}!",
      "template_content": "<p>...</p>",
      "template_variables": ["username"],
      "template_language": "en",
      "template_version": 1,
      "is_active": true,
      "created_at": "2023-10-27T10:00:00.000Z",
      "updated_at": "2023-10-27T10:00:00.000Z"
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
- `400 Bad Request`: If query parameters are invalid (e.g., `page` or `limit` are not integers or out of range).
- `500 Internal Server Error`: For unexpected server issues.

#### GET /templates/name/:template_name
Retrieves a single active notification template by its unique name.

**Request**:
**Path Parameters**:
- `template_name` (required): `string`, the unique name of the template.

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "template_name": "welcome-onboarding",
    "channel_type": "email",
    "template_subject": "Welcome to Our Platform, {{username}}!",
    "template_content": "<p>...</p>",
    "template_variables": ["username"],
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
- `404 Not Found`: If no active template with the specified name exists.
- `500 Internal Server Error`: For unexpected server issues.

#### GET /templates/:id
Retrieves a single notification template by its UUID.

**Request**:
**Path Parameters**:
- `id` (required): `string` (UUID), the unique identifier of the template.

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "template_name": "welcome-onboarding",
    "channel_type": "email",
    "template_subject": "Welcome to Our Platform, {{username}}!",
    "template_content": "<p>...</p>",
    "template_variables": ["username"],
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
- `404 Not Found`: If no template with the specified ID exists.
- `500 Internal Server Error`: For unexpected server issues.

#### PUT /templates/:id
Updates an existing notification template by its UUID.

**Request**:
**Path Parameters**:
- `id` (required): `string` (UUID), the unique identifier of the template.
**Payload**: (Partial `CreateTemplateDto`)
```json
{
  "template_subject": "Updated Welcome Message",
  "is_active": false
}
```
**Required fields**: None (all fields are optional for update).

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "template_name": "welcome-onboarding",
    "channel_type": "email",
    "template_subject": "Updated Welcome Message",
    "template_content": "<p>...</p>",
    "template_variables": ["username"],
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
- `400 Bad Request`: If request payload contains invalid data.
- `404 Not Found`: If no template with the specified ID exists.
- `500 Internal Server Error`: For unexpected server issues.

#### DELETE /templates/:id
Deletes a notification template by its UUID.

**Request**:
**Path Parameters**:
- `id` (required): `string` (UUID), the unique identifier of the template.
No payload required.

**Response**:
```json
{
  "success": true,
  "message": "Template deleted successfully"
}
```

**Errors**:
- `404 Not Found`: If no template with the specified ID exists.
- `500 Internal Server Error`: For unexpected server issues.

## Technologies Used

| Technology         | Description                                     |
| :----------------- | :---------------------------------------------- |
| **NestJS**         | Progressive Node.js framework for building efficient, reliable, and scalable server-side applications. |
| **TypeScript**     | Superset of JavaScript that adds static typing.  |
| **TypeORM**        | ORM that can run in NodeJS, Browser, React Native, Expo, and Electron platforms. Supports PostgreSQL, MySQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana, WebSQL databases. |
| **PostgreSQL**     | Powerful, open-source object-relational database system. |
| **Docker**         | Platform for developing, shipping, and running applications in containers. |
| **Terminus**       | NestJS module for health checks and graceful shutdowns. |
| **Class-Validator**| Decorator-based validation for TypeScript/JavaScript classes. |
| **Class-Transformer**| Decorator-based transformation for TypeScript/JavaScript classes. |
| **RxJS**           | Reactive Extensions Library for JavaScript. |

## Contributing
We welcome contributions to the Notification Template Service! To contribute:

1.  🍴 **Fork the repository.**
2.  🌿 **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  ✨ **Implement your changes**, ensuring you follow existing code style and best practices.
4.  🧪 **Write unit and/or integration tests** for your changes.
5.  ✅ **Ensure all tests pass** (`npm test`).
6.  📜 **Update the documentation** if your changes modify existing features or add new ones.
7.  ⬆️ **Commit your changes** with a clear and concise message.
8.  🚀 **Push your branch** to your forked repository.
9.  📬 **Open a pull request** to the `main` branch of the original repository.

## License
This project is currently **UNLICENSED**.

## Author Info

*   **Your Name**: [Link to your LinkedIn]
*   **Email**: [Your Email Address]
*   **Website/Portfolio**: [Link to your personal website/portfolio]

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-EE2D41?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FF4F2B?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)