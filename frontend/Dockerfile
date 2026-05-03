# Use an official Node.js runtime as a parent image
FROM node:20-slim
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]