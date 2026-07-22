# 1. Use the lightweight Node Alpine image
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files first for layer caching
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the backend code
COPY . .

# 6. Document the port (Change 3002 if your server.js uses a different port!)
EXPOSE 3002

# 7. Start the server
CMD ["node", "server.js"]