FROM node:18

ARG version
ENV IMG_VERSION=$version

RUN mkdir -p /app
WORKDIR /app/backend

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY . .

RUN npm install --development

RUN npm install -g typescript
RUN npm install -g ts-node

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
