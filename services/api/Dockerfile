FROM node:9

RUN npm i -g nodemon
RUN npm i -g npm@^5.7.1
RUN npm -v

RUN mkdir /var/lib/app

COPY ./api/src/package*.json /var/lib/app/
WORKDIR /var/lib/app
RUN npm ci

COPY ./api/src /var/lib/app/
COPY ./api/scripts /home/docker/

EXPOSE 80

ENTRYPOINT ["/home/docker/startup.sh"]
