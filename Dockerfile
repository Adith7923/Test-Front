# Stage 1: Build stage
FROM node:14-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:14-alpine

WORKDIR /app
COPY --from=builder /app/build ./build
RUN npm install -g serve
EXPOSE 9988
CMD ["serve", "-s", "build", "-l", "9988"]

