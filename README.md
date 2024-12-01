

Table of Contents
Figma Design
Objective
Requirements
Features
Backend Development
Frontend Development
Deployment with Docker
How to Run
Technologies Used.

Objective
Develop a basic e-commerce application that includes:

User Authentication
Product Listing
Shopping Cart
Demonstrate proficiency in:

Full-stack development
Database integration
API endpoints
Dockerized deployment


Backend Development
API Development

Built with Node.js and Express.js.
RESTful API endpoints include:
User Authentication
POST /register: Register a new user.
POST /login: Authenticate a user and return a JWT.
Product Management (Admin Only)
GET /products: Retrieve a list of products.
GET /products/:id: Retrieve details of a specific product.
POST /products: Add a new product.
PUT /products/:id: Update an existing product.
DELETE /products/:id: Delete a product.
Shopping Cart
GET /cart: Retrieve the user's shopping cart.
POST /cart: Add an item to the cart.
DELETE /cart/:id: Remove an item from the cart.
Database

MongoDB to store:
User information
Product data
Shopping cart details
Schema design and relationships using Mongoose.
Authentication & Authorization

JWT-based authentication.
Middleware to protect routes:
Admin-only access for product management endpoints.
Authenticated access for cart management endpoints.


Frontend side :
AuthForm: Handles registration and login forms.
ProductList: Displays a list of products.
ProductDetail: Displays detailed information about a product.
Cart: Displays the user's shopping cart with item removal functionality.
Routing: use React-router


Features
User Authentication:

Register, log in, and log out.
Authenticated users can view and manage their shopping cart.
Product details page.
Users can add products to the cart.
View cart items

How to run:
docker-compose build
docker-compose up
docker-compose down

Backend :
npm install
npm start

Frontend:
npm install
npm i redux react-redux axios @redux/toolkit
configure tailwind
npm start

Technologies Used
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
Frontend: React, Redux, React Router, CSS Modules/SCSS/TailwindCSS
Deployment: Docker, Nginx
Tools: Postman for API testing,
