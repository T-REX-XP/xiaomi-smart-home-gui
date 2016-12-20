FROM node:latest

# Create app directory
RUN mkdir -p /mihome
WORKDIR /mihome
COPY . /mihome

RUN ./install.sh

CMD [ "./start.sh" ]

VOLUME ["/mihome/db"]
