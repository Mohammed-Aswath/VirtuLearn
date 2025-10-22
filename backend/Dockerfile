#
# GENERATED/EDITED BY CURSOR — PURPOSE: Backend container image for VirtuLearn
# BACKEND CONTRACT: Exposes /api endpoints
# TODO: Pin node version per environment policy

FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm i
COPY . .
ENV NODE_ENV=production
EXPOSE 8081
CMD ["npm", "start"]


