# Stage 1: Dependency Loader
FROM node:24-alpine AS dependencies

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install ALL dependencies (including devDeps for linting/tests if needed)
RUN npm install

# Stage 2: Final Runner
FROM node:24-alpine AS runner

# Set production environment
ENV NODE_ENV=production

WORKDIR /app

# Install wget for healthchecks and clean up apt cache
RUN apt-get update && apt-get install -y --no-install-recommends wget \
    && rm -rf /var/lib/apt/lists/*

# Copy node_modules from the first stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy your actual source code and root files
COPY . .

# Prune devDependencies now that we're in the runner
# This keeps the image small by removing tools like ESLint
RUN npm prune --production

# Expose the port your app uses
EXPOSE 3000

# Use the non-root node user for security
USER node

# Start the app using index.js
CMD ["node", "index.js"]