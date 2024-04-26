FROM node:16.17.0

RUN npm i -g @nestjs/cli@9.0.0

USER node
CMD ["sleep", "infinity"]
