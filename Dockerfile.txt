# Usa a imagem oficial do Nginx como base
FROM nginx:stable-alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copia os arquivos de build do seu projeto para o diretório de serviço do Nginx
# Certifique-se de que o caminho /home/ubuntu/site_casa_caramelo/dist corresponde ao seu diretório de build
COPY ./dist /usr/share/nginx/html

# Copia a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para acesso via HTTP
EXPOSE 80

# Inicia o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
