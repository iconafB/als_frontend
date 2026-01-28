# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Install deps first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .

RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:alpine AS runtime

# Replace default nginx config with SPA-friendly config
RUN rm -f /etc/nginx/conf.d/default.conf && \
    printf '%s\n' \
    'server {' \
    '  listen 80;' \
    '  server_name _;' \
    '  root /usr/share/nginx/html;' \
    '  index index.html;' \
    '' \
    '  # SPA routing (React Router etc.)' \
    '  location / {' \
    '    try_files $uri $uri/ /index.html;' \
    '  }' \
    '' \
    '  # Optional: cache static assets aggressively' \
    '  location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {' \
    '    try_files $uri =404;' \
    '    expires 1y;' \
    '    add_header Cache-Control "public, immutable";' \
    '  }' \
    '}' \
    > /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
