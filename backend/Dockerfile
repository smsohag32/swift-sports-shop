# ===========================
# 🌟 Stage 1: Build Backend
# ===========================
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project to the container
COPY . .

# ===========================
# 🌟 Stage 2: Run Backend
# ===========================
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Copy dependencies and source code from the build stage
COPY --from=build /app /app

# Copy environment variables (ensure .env is added in .dockerignore for security)
COPY .env .env

# Expose the port your Express app runs on (change if necessary)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
