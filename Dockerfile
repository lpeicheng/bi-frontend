FROM nginx

WORKDIR /www/server/panel/vhost/nginx/html
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /www/server/panel/vhost/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
