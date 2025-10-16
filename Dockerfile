# Usa a imagem base do Nginx
FROM nginx:stable-alpine

# Remove as configurações padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copia os arquivos de build do seu projeto para o diretório de serviço do Nginx
# (certifique-se de que a pasta dist existe no mesmo diretório do Dockerfile)
COPY ./dist /usr/share/nginx/html

# Copia a configuração personalizada do Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para o tráfego HTTP
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
