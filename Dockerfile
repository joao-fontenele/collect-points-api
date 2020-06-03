FROM node:12-alpine

ENV HOME /home/node
ENV CODE $HOME/code

RUN apk add --update --no-cache git

RUN mkdir -p $CODE

WORKDIR $CODE

CMD ["npm", "run", "start:dev"]
