# Stage 1 - build environment
FROM node:18-alpine AS build

RUN apk add --no-cache python3 make g++ git

# Create app directory
WORKDIR /usr/src/app

COPY .npmrc ./
COPY package*.json ./

# Install app dependencies
RUN npm ci 

# Copy all required files
COPY . .

# Build the application
RUN npm run build:web

# Stage 2 - the production environment
FROM nginx:stable-alpine

# Copy artifacts and nginx.conf
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY --from=build /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Replace the placeholder with the actual BACKEND_URL and start Nginx
CMD ENABLE_EXTERNAL_DB_VALUE=$(if [ "$ENABLE_EXTERNAL_DB" = "true" ]; then echo "!0"; else echo "!1"; fi) && \
    sed -i "s#http://localhost:3333#$BACKEND_URL#g" /usr/share/nginx/html/*.js && \
    sed -i "s#ENABLE_EXTERNAL_DB:!1#ENABLE_EXTERNAL_DB:$ENABLE_EXTERNAL_DB_VALUE#g" /usr/share/nginx/html/*.js && \
    nginx -g 'daemon off;'