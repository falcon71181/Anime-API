FROM node:21-slim

WORKDIR /ani

COPY src /ani/src/
COPY package.json /ani/
COPY tsconfig.json /ani/

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
EXPOSE 3001
