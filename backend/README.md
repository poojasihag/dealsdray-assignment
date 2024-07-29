# Node Express and Mongoose Backend Project

## Overview

This is a Node.js backend project using Express and Mongoose for building a robust and scalable server. The project includes authentication, authorization, and MongoDB integration using Mongoose.

## Dependencies

- **bcrypt** (^5.1.1): Library for hashing passwords securely.
- **cookie-parser** (^1.4.6): Middleware for parsing cookies in Express.
- **cors** (^2.8.5): Middleware for handling Cross-Origin Resource Sharing (CORS) in Express.
- **dotenv** (^16.3.1): Zero-dependency module that loads environment variables from a .env file.
- **express** (^4.18.2): Fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken** (^9.0.2): JSON Web Token (JWT) implementation for node.js.
- **mongoose** (^8.0.3): Elegant MongoDB object modeling for Node.js.
- **mongoose-aggregate-paginate-v2** (^1.0.6): Mongoose plugin for adding pagination to the `aggregate` method.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-project.git
    cd your-project
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory and configure the following environment variables:**

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/your-database
    JWT_SECRET=your-secret-key
    ```

    Adjust the values according to your setup.

## Usage

- **Run the server:**

    ```bash
    npm start
    ```

- The server will be running at `http://localhost:3000` by default. You can change the port in the `.env` file.

## API Endpoints

- The API documentation will be available at `http://localhost:3000/api-docs` using Swagger UI.

## Project Structure

