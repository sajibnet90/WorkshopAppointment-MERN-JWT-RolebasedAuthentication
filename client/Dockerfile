# Stage 1: Build the React application
FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy the rest of the frontend files
COPY . .
# Build the React application to the build directory
RUN npm run build

# Stage 2: Serve the React application
FROM node:18
WORKDIR /app

# Install serve to serve the React application
RUN npm install -g serve

# Copy the build directory from the previous stage
COPY --from=build-stage /app/dist ./dist

# Expose port 80 for the web server (optional for docker-compose)
EXPOSE 80

# Serve the React app using serve
CMD ["serve", "-s", "dist", "-l", "80"]
