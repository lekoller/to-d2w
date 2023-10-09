FROM node:18.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}

CMD ["npm", "run", "dev"]
