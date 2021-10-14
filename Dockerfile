# syntax = docker/dockerfile:1.3-labs

FROM node:16-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
ARG NPM_TOKEN

RUN <<EOF cat >> .npmrc
# NPM config
registry=https://npm.r3s.dev/
always-auth=true
//npm.r3s.dev/:_authToken="${NPM_TOKEN}"
EOF

COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build
RUN rm -f .npmrc


# Bundle static assets with nginx
FROM nginx:alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
