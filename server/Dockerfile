FROM node:16-alpine
WORKDIR "/meshapp"
COPY ./package.json ./
RUN yarn install
COPY ./ ./
CMD ["npm", "run", "start-gui"]