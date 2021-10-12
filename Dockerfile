# Stage 1 - the build process
FROM node:alpine as build-deps
WORKDIR /usr/src/app
ARG NPM_TOKEN
COPY .npmrc .npmrc
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build
RUN rm -f .npmrc


# Stage 2 - the production environment
FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]