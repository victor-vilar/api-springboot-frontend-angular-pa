FROM node:18-alpine3.17
WORKDIR /app
COPY ./src ./src
COPY ./angular.json ./package.json package-lock.json .
COPY ./tsconfig.app.json ./tsconfig.json .
RUN npm install && npm install -g @angular/cli
#RUN npm run build
#EXPOSE 4200
CMD ["ng","s","--host","0.0.0.0"]
#RUN npm cache clean --force
