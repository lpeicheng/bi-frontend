FROM nginx

WORKDIR /www/wwwroot/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /www/wwwroot/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
