FROM node:22

WORKDIR /app

COPY . .

RUN sudo apt install npm
RUN npm init vite@latest my-app -- --template react


WORKDIR /app/my-app

RUN npm install

EXPOSE 3000

CMD ["npm","run","dev"]