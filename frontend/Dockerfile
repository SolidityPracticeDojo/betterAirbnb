# Use an official Node.js image as the base
FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the container
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the frontend source code to the container
COPY src /app/src
COPY public /app/public

# Build the frontend
RUN pnpm run build

# Expose the production port (if necessary)
EXPOSE 3000

# Run the frontend server
CMD ["pnpm", "start"]

