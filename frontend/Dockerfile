# Use an official Node.js image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the container
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install

# Copy the frontend source code to the container
COPY src /app/src
COPY public /app/public

# Build the frontend
RUN npm run build

# Expose the production port (if necessary)
EXPOSE 3000

# Run the frontend server
CMD ["npm", "start"]

