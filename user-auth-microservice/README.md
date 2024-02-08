## # Authentication Microservice

# Description
This microservice handles user authentication for the blogging platform. It provides endpoints for user registration, login, and logout. User data is stored in a MongoDB database, and JSON Web Tokens (JWT) are used for authentication.

# Docker run
`docker-compose up`

# Setup localy
Install dependencies:
`npm install`

Running the Microservice:
`npm run start-auth`

The microservice will be running at http://localhost:3000.

# Endpoints

**POST /auth/register**
Register a new user.
Request body:
`{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john_doe@test.com",
  "password": "password123"
}`

**POST /auth/login**
Login and receive a JWT token.
Request body:
`{
  "email": "john_doe@test.com",
  "password": "password123"
}`

**POST /auth/logout**
Logout and invalidate the JWT token.

