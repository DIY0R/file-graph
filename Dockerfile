FROM node:20

WORKDIR /f-graph

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run","test"]
