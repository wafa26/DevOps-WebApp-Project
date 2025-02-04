#Use Node.js as base image to build React app
FROM node:18 AS build

#Set working directory
WORKDIR /app

# copy package.json from Frontend/ 
COPY package.json package-lock.json ./

#Install dependencies
RUN npm install

#copy the entire frontend source code
COPY . . 

#Build React app
RUN npm run build  

#Use Nginx to serve the built app
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

#copy built files from previous stage
COPY --from=build /app/build /usr/share/nginx/html

#expose frontend port
EXPOSE 80

#Start Nginx
CMD ["nginx", "-g", "daemon off;"]
