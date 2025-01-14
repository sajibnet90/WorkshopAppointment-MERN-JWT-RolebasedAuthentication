#file: client/Dockerfile
# Use a node base image to build the React application
FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy the rest of the frontend files
COPY . .
# Build the React application to the build directory
RUN npm run build


# Set up the stage for serving the React application
FROM node:18
# Set the working directory to serve the app
WORKDIR /app

# Install serve to serve the React application
RUN npm install -g serve

# Copy the build directory from the previous stage
COPY --from=build-stage /app/dist ./dist
# Expose port 80 for the web server, not needed when using docker-compose unless using a custom network
#EXPOSE 80

# Serve the React app using serve
CMD ["serve", "-s", "dist", "-l", "80"]
