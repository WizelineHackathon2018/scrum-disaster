FROM python

RUN mkdir /var/lib/app

WORKDIR /var/lib/app

COPY ./score/src /var/lib/app/
COPY ./score/scripts /home/docker/

EXPOSE 80

ENTRYPOINT ["/home/docker/startup.sh"]
