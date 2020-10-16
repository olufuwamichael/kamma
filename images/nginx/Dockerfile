FROM nginx:alpine
COPY ./images/nginx/conf.d/nginx.conf /etc/nginx/nginx.conf
COPY ./images/nginx/vhosts /etc/nginx/sites-enabled
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]