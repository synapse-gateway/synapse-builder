FROM node:alpine as builder 

WORKDIR '/reactgui'

COPY package.json .

RUN npm install

COPY . .

RUN npm start
# CMD ["npm", "run", "start"]

# start a second phase
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /reactgui/build /usr/share/nginx/html