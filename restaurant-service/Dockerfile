# Use a minimal Node.js base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port your app runs on
EXPOSE 5002

# Command to run the app
CMD ["npm", "start"]
