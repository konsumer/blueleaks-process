FROM node:14-buster

WORKDIR /usr/app

RUN apt-get -y update && apt-get -y upgrade && apt-get -y install tesseract-ocr poppler-utils
ADD ./app/* /usr/app/
RUN npm i