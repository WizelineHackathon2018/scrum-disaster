FROM node:9

RUN npm i -g npm@^5.7.1
RUN npm -v

RUN mkdir /var/lib/app

COPY ./web/src/package*.json /var/lib/app/
WORKDIR /var/lib/app
RUN npm ci

COPY ./web/src /var/lib/app/
RUN npm run build

COPY ./web/scripts /home/docker/

ENTRYPOINT ["/home/docker/startup.sh"]
