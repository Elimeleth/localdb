FROM node:16 as UNKNOW

LABEL authors="Anti Baneo" 


COPY package.json /tmp/package.json
RUN cd /tmp && npm install && mkdir -p /jsonDB && cp -a /tmp/node_modules /jsonDB

# COPY /src/logs/* /jsonDB/src/logs/
WORKDIR /jsonDB

COPY . .

ENTRYPOINT [ "node" ]
