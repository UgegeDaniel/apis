# Project Readme
## Description
__This project is a TypeScript-based backend application built using Express and PostgreSQL.__

It provides a RESTful API for user management, email verification, score tracking, and administration functionalities. The API includes routes for user signup, signin, email verification, score retrieval and saving, as well as routes restricted to administrators for managing questions and subjects.

The project features a well-defined schema for data entities, ensuring data consistency and integrity. It utilizes services to handle business logic and interact with the database and other external services. Middlewares are employed for authentication, request validation, error handling, and logging.

Technologies used in the project include Express for building the API, PostgreSQL as the database, Nodemailer for sending verification emails, Bcrypt for password hashing, and Winston for logging.

The project also incorporates the following development tools:

1. ESLint: A JavaScript/TypeScript linter that helps maintain a consistent code style and catch common errors.
2. Husky: A Git hook tool that allows running scripts before commits and pushes, enabling code quality checks and ensuring adherence to project standards.
3. Prettier: An opinionated code formatter that enforces consistent code formatting rules across the project, enhancing code readability and maintainability.

The project's readme provides detailed instructions for installation, prerequisites, and running the application. It also includes information about routes, middlewares, technologies used, and the process for adding questions as an admin.

Contributions to the project are welcome, and authors can be listed accordingly.

Overall, the project provides a solid foundation for building a scalable and secure backend application with user management, score tracking, and the flexibility to add questions from a remote server or local JSON file. The incorporation of TypeScript, ESLint, Husky, and Prettier ensures code quality, maintainability, and a streamlined development process.

## Features
This project includes the following features:

### Controllers:

The project includes controllers to handle different actions and requests, such as user signup, user signin, verifying email, resending email, retrieving student scores, saving student scores, adding questions (admin), and adding subjects (admin).

### Routes:

The project defines routes for various endpoints, including signup, signin, verifyEmail, resendEmail, getStudentScore, saveStudentScore, addQuestion (admin), and addSubject (admin).
[View Example Requests and Responses](Example-Requests.md)

### Services:

The project utilizes services to handle business logic and interact with the database and other external services. These services ensure the proper execution of various actions, such as user authentication, email verification, score management, and data manipulation.

### Schema:

The project implements a schema to define the structure and validation rules for different data entities. This helps ensure data consistency and integrity.

### Models:
The project features a well-defined schema for data entities, ensuring data consistency and integrity. It utilizes models to represent the data structure and define the relationships between different entities. These models serve as the blueprint for creating and manipulating data in the database.

The project incorporates the following models:

1. User Model: Represents a user entity in the system.
Contains fields such as id, name, email, password, and createdAt.
Defines methods for user authentication and data manipulation.

2. Score Model: Represents a student's score entity in the system.
Contains fields such as id, studentId, subject, score, and createdAt.
Defines methods for retrieving and saving student scores.
3. Question Model: Represents a question entity in the system.
Contains fields such as id, questionText, options, correctAnswer, and createdAt.
Defines methods for adding and retrieving questions.
4. Subject Model: Represents a subject entity in the system.
Contains fields such as id, name, and createdAt.
Defines methods for adding and retrieving subjects.

The project's models help ensure data consistency, provide a structured approach to data manipulation, and facilitate database operations.

### Email Verification:

The project includes functionality to verify user email addresses. This involves sending verification emails using Nodemailer and validating the email tokens sent to users during the signup process.

### Middlewares:

The project utilizes middlewares for handling various tasks such as authentication, request validation, error handling, and logging. These middlewares enhance the functionality, security, and reliability of the application.

### Command Line Interface 
Admin users have the ability to add questions to the system. They can choose to fetch questions from a remote server by running a CLI command or upload questions from a JSON file stored locally in the project.
[View Example Commands](Example-CLI-Command.md)

## Technologies
The project utilizes the following technologies:

### Express

A fast and minimalist web framework for Node.js, used to build the RESTful API and handle HTTP requests and responses.

### PostgreSQL

A powerful open-source relational database management system. The project uses PostgreSQL as the database for data storage and retrieval, without employing an Object-Relational Mapping (ORM) tool.

### Nodemailer

A module for Node.js used to send emails. It is employed in the project to send verification emails to users during the signup process.

### Bcrypt

A library used for password hashing and encryption. It ensures the secure storage of user passwords in the database.

### Winston

A versatile logging library for Node.js. Winston is utilized in the project for logging various events, errors, and information, aiding in debugging and monitoring.

## Middlewares
The project includes the following middlewares:

### Authentication Middleware:

This middleware verifies the authenticity of user requests by checking the validity of access tokens. It ensures that only authenticated users can access protected routes. Also this middleware keeps track of users role used to implement role manangement

### Request Validation Middleware:

This middleware validates the incoming requests to ensure that the required fields are present and that the data meets the specified criteria. It helps prevent invalid or malicious data from being processed.

### Error Handling Middleware:

This middleware handles errors that occur during the execution of routes and other middleware. It provides appropriate error responses to the client and logs detailed error information. It takes advantage of the custom express middleware feature for a centralised error handling

### Logging Middleware:

This middleware logs request and response information, including HTTP method, URL, response status, and execution time. It helps in monitoring and debugging the application.

# Getting Started
These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
1. Node.js (version 16.20.0 or higher)
2. PostgreSQL database

Clone the repository to your local machine:
```sh
git clone https://github.com/UgegeDaniel/apis
```

Install the required dependencies:
```sh
npm install --legacy-peer-deps
```

Set up the environment variables:
Create a .env file in the project's root directory.
Configure the following environment variables in the .env file:

```
PORT=5000
DB_USER=db username
DB_PASSWORD=db password
DB_HOST=db host
DB_PORT=db port
DB_DATABASE=db name
ENVIRONMENT=development
JWT_SECRET=jwt secret
BCRYPT_SALT=bcrypt salt
STUDENT_ROLE_ID=student role id from roles table
ADMIN_ROLE_ID=admin role id from roles table
QUESTIONS_URL=remote questions api
NODE_MAILER_PASS=gmail password to allow node mailer access
REF_EXPIRATION=number of minutes for reference expiration
```

Run the server in development environment:

```sh
npm run ts-dev
```

The project should now be running locally on http://localhost:5000.

Run the server in production environment:

```sh
npm run server
```

The project should now be running locally on http://localhost:5000.

_On server start, the dbInit function is executed, which runs a single PostgreSQL query to create the tables following the specified schema, add relations, add extra columns, add constraints, check for allowed entries, and run default queries. If no errors occur, the server will log 'Server running on port ${port}'._

## Contributing
Contributions to this project are welcome. To contribute, please follow the guidelines outlined in CONTRIBUTING.md.

## Author
🇳🇬 Daniel Ugege - ugege62@gmail.com 

| [Twiter](https://twitter.com/ugege_daniel)
| [LinkedIn](https://www.linkedin.com/in/daniel-ugege-50a499227/) 

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [`LICENSE`](LICENSE) file for more information.

## Acknowledgments
[Ugege Lewis](https://github.com/frankly034) and God Almighty .