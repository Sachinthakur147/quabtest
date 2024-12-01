# Stage 1: Build with Node.js
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . /app/

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine as production

# Copy built files from the first stage to Nginx's default public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
