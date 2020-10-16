FROM node:14.6.0

WORKDIR /var/www/vhosts/web

COPY ./web/package.json ./

RUN yarn install --silent

EXPOSE 3000

CMD ["yarn", "run", "start"]