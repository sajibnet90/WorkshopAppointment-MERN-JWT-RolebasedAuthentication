##file: server/Dockerfile

FROM node:18

# Set the working directory in the Docker container
WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy the rest of the backend code into the Docker container
COPY . .

# Make port 5000 available outside this container This tells Docker that the container will listen on port 5000. However, 
#this port is only accessible to other containers on the same Docker network, not to the host machine or external networks.

#EXPOSE 5001

# Run the app when the container launches
CMD ["node", "index.js"]
