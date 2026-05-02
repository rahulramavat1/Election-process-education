# Stage 1: Build & Prepare
FROM alpine AS builder
WORKDIR /app
COPY . .
RUN rm -rf tests Dockerfile README.md SECURITY.md

# Stage 2: Serve Minimal Image
FROM nginx:alpine-slim
COPY --from=builder /app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
