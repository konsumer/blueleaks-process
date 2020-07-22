FROM bitnami/minideb:buster

RUN install_packages python3 python3-pip
RUN pip3 install elasticsearch

WORKDIR /usr/src/app
COPY . .

VOLUME /data

ENV INPUT /data
ENV ELASTICSEARCH http://elasticsearch:9200
ENV COLLECTION fileindex

CMD [ "python3", "extract.py" ]