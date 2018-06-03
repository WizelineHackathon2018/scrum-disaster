FROM ubuntu:latest

RUN apt-get update -y

RUN apt-get install -y python-pip python-dev build-essential

RUN mkdir /var/lib/app

WORKDIR /var/lib/app

COPY ./score/src /var/lib/app/
COPY ./score/scripts /home/docker/

RUN pip install -r freeze.txt

EXPOSE 5000

ENV FLASK_APP=main.py

ENTRYPOINT ["/home/docker/startup.sh"]