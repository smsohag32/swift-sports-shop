# ===========================
# 🌟 Stage 1: Build React App
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

# Build the React app
RUN npm run build

# ===========================
# 🌟 Stage 2: Serve with Nginx
# ===========================
FROM nginx:alpine AS runtime

# Set working directory in Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy built React app from the previous stage
COPY --from=build /app/dist .

# Expose port 5173
EXPOSE 5173

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
