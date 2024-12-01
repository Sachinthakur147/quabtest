# Step 1: Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . /app/

# Expose the application port
EXPOSE 5000

# Define the command to run the app
CMD ["node", "server.js"]
