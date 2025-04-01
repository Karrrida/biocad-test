FROM node:20.15.1-alpine as builder

WORKDIR /app

RUN apk add --no-cache openssl python3 make g++

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npx prisma generate
COPY . .
RUN npm run build

FROM node:20.15.1-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
