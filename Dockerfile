FROM alpine/git:latest as clone
MAINTAINER Spencer Pollock "spencer@spollock.ca"

WORKDIR /root

RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts
RUN chown -R root:root /root/.ssh

RUN git clone --progress --verbose git@github.com:srepollock/typescript-bootstrap.git > /dev/null 

#

FROM node:13.8.0-alpine
MAINTAINER Spencer Pollock "spencer@spollock.ca"

WORKDIR /root

COPY --from=clone /root/typescript-bootstrap/ /root/ 

RUN npm i && \
    npm run bundle && \
    npm run test
