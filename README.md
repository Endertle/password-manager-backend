# Password Manager Backend

## Description
This backend service provides a secure platform for managing and storing passwords. It includes user authentication, password management, and token-based security features. The API allows users to register, log in, and manage their passwords effectively with robust security measures.

## Features

- **User Authentication**: Register new users, log in existing users, and manage authentication tokens.
- **Password Management**: Add, retrieve, update, and delete passwords.
- **Token Security**: Use JSON Web Tokens (JWT) for secure authentication and session management.
- **Encryption**: Securely encrypt sensitive data to ensure privacy and security.

## Technologies

- **Node.js**: Server-side runtime for handling API requests.
- **Express.js**: Web framework for building the RESTful API.
- **PostgreSQL**: Relational database for storing user and password data.
- **JWT**: For secure token-based authentication.
- **bcrypt**: For hashing passwords.


## Setup
To get started with this project, follow these steps:
1. **Clone the Repository**
     ```bash
     git clone https://github.com/Endertle/password-manager-backend.git
    ```
2. **Navigate to the Project Directory**
    ```bash
    cd password-manager-backend   
    ```
3. **Install Dependencies**
    ```bash
    npm install   
    ```
4. **Configure Environment Variables**

    ```plaintext 
    # Create a `.env` file in the root directory of the project 
    # with the following template. Replace the placeholder values
    # with your actual configuration settings:
    
    # server env 
    SERVER_PORT=5000 
    SERVER_HOSTNAME="localhost" 
    
    # database env     
    DATABASE_HOST=
    DATABASE_NAME=
    DATABASE_USER=
    DATABASE_PASSWORD=
    DATABASE_PORT=
    
    # jwt 
    JWT_SECRET_KEY=
    JWT_REFRESH_SECRET_KEY=
    JWT_ACCESS_EXPIRATION= 
    JWT_REFRESH_EXPIRATION=
    
    # encryption 
    ENCRYPTION_SECRET_KEY=
    ```
5. **Run the Project**
    ```bash 
    npm run dev 
    ```

## API Endpoints

### Authentication

- **Register User**: `POST /api/v1/users/sign-up` - Registers a new user.
- **Login User**: `POST /api/v1/users/sign-in` - Logs in an existing user.
- **Refresh Token**: `POST /api/v1/users/refresh` - Refreshes the authentication token.

### Password Management

- **Add New Password**: `POST /api/v1/passwords` - Adds a new password.
- **Get All Passwords**: `GET /api/v1/passwords` - Retrieves a list of all passwords.
- **Get Password**: `GET /api/v1/passwords/:id` - Retrieves a specific password by its ID.
- **Delete Password**: `DELETE /api/v1/passwords/:id` - Deletes a specific password by its ID.
- **Update Password**: `PUT /api/v1/passwords/:id` - Updates a specific password by its ID.

