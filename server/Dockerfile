##file: server/Dockerfile

FROM node:18

# Set the working directory in the Docker container
WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy the rest of the backend code into the Docker container
COPY . .

# Make port 5000 available outside this container
EXPOSE 5000

# Run the app when the container launches
CMD ["node", "index.js"]
