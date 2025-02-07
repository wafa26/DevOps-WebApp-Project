#Use Node.js as base image
FROM node:18

#Set working directory inside container
WORKDIR /app

#copy package.json and install dependencies
COPY package*.json ./
RUN npm install

#copy entire backend source code
COPY src/ ./src/

#Expose backend port
EXPOSE 5000

#start the backend
CMD ["node", "src/server.js"]
