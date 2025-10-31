# -----------------------------
# Step 1: Build the React/Vite App
# -----------------------------
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (better cache usage)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the production-ready static files
RUN npm run build

# -----------------------------
# Step 2: Serve the app using Nginx
# -----------------------------
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx web server
CMD ["nginx", "-g", "daemon off;"]
