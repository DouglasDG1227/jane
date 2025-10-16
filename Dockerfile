FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d/*

# Copia todos os arquivos do site (index.html, assets, etc)
COPY . /usr/share/nginx/html

# Copia a configuração personalizada do Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
