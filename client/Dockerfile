FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔴 REQUIRED for next start
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
