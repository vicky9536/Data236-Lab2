# Use a lightweight Node image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port your server runs on
EXPOSE 5003

# Run the server
CMD ["npm", "start"]
