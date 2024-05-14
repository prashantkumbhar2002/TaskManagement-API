# Task Management API

This project provides a RESTful API for task management, allowing users to perform CRUD operations on tasks and manage user authentication.

## Requirements
For development, you will only need Node.js and a node global package, npm, installed in your environement.

## Table of Contents

- [Installation](#installation)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Starting the Server](#starting-the-server)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Accessing the APIs](#accessing-the-apis)
  - [API Documentation](#api-documentation)
  - [Example API Requests](#example-api-requests)
- [Additional Information](#additional-information)

## Installation

### Clone the Repository
Use the command in the terminal:
```bash
git clone git@github.com:prashantkumbhar2002/TaskManagement-Backend.git
cd task-management-api
```

### Install Dependencies
```bash
npm install
```

## Configuration
Set up the required environment variables:
    - Create a .env file in the project root.
    - Define environment variables in the .env file:

    Ex. 
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/task-manager
      JWT_SECRET=mysecretkey
    
## Database Setup
Ensure that MongoDB is running and accessible.


## Starting the Server
### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Accessing the APIs
### API Documentation
Once the server is running, access the API documentation:

    Open http://localhost:5000/docs in a web browser.

### Example API Requests
- First register by giving userName, full name, Password;

  - Register a User - /api/v1/users/register 


- Login using credentials - userName, Password

  - Login to Obtain Token - /api/v1/users/login


- Access any resource from task or user management apis listed on that page

  - Access Protected Resource - /api/v1/tasks/ , /api/v1/tasks/{id}, etc

  Include the obtained token in the Authorization header to access protected resources.


## Additional Information
This project uses JWT for authentication and MongoDB for data storage.
