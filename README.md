# Bingo Webapp

## Overview
Bingo Webapp is a full-stack application built with Node.js, Express, WebSocket, and MySQL. The backend implements the MVC pattern, and the frontend is a separate React application. This README provides instructions on how to set up and run the application.

## Prerequisites

To run the Bingo Webapp, you'll need the following installed on your system:
- MySQL 5
- Node.js 20
- Docker with Docker Compose

## Configuration

Before running the application, ensure that you have a `.env` file in the root directory with all the necessary environment variables. This file includes database configurations, port settings, and other environment-specific variables.

## Backend

The backend uses Express for creating RESTful endpoints and `ws` for handling WebSocket connections. 

### Database and Authentication

- Sequelize is used as the ORM for MySQL database interactions.
- Passwords are hashed using bcrypt for enhanced security.

### Running the Backend

To start the backend services, follow these steps:

1. Ensure Docker and Docker Compose are installed.
2. Build the frontend image (refer to the Frontend section below).
3. Run `docker-compose up` in the root directory of the backend project. This command starts all the required services, including the MySQL database and the Node.js application.

## Frontend

The frontend is a separate React application and needs to be built and containerized before it can be included in the Docker Compose stack.

### Building the Frontend Image

1. Clone the frontend repository.
2. Navigate to the frontend directory.
3. Build the Docker image for the frontend:
   ```
   docker build -t frontend .
   ```

## Testing

Unit tests and integration tests are written using the Jest library. To run the tests:

1. Navigate to the project directory.
2. Run the tests:
   ```
   npm test
   ```

Please note that the current test coverage is approximately 50%. Due to time constraints, it was not possible to achieve higher coverage.

## Usage

Once the Docker Compose stack is up, you can access the Bingo Webapp through the configured ports (as specified in the `docker-compose.yml` and `.env` files).
