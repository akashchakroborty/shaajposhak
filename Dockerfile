FROM node:8.16.2

WORKDIR /usr/src/shaajposhak

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]