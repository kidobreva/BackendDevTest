## Blog Post Microservice

# Description
This microservice manages blog posts for the blogging platform. It supports CRUD operations for blog posts, ensuring that only authenticated users can create, update, or delete their own posts. Post data is stored in a MongoDB database.

# Setup
Install dependencies:
`npm install`

Running the Microservice:
`npm start`

The microservice will be running at http://localhost:9090.

# Endpoints

**POST /blog/post**
Create a new blog post.
Request body:
`{
  "title": "Test Post",
  "content": "A test blog post content."
}`

**GET /blog/posts**
Retrieve all blog posts.

**GET /blog/posts/:postId**
Retrieve a specific blog post.

**PUT /blog/posts/:postId**
Update a specific blog post.
Request body:
`{
  "title": "Updated Post",
  "content": "Updated content."
}`

**DELETE /blog/posts/:postId**
Delete a specific blog post.
