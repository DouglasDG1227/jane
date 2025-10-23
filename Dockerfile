# 🔧 Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Instala pnpm e dependências
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copia todo o código-fonte
COPY . .

# Executa o build do front-end e do back-end
RUN pnpm run build

# 🏁 Production stage
FROM node:22-alpine

WORKDIR /app

# Instala pnpm
RUN npm install -g pnpm

# Copia arquivos de configuração
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copia arquivos gerados e fontes
COPY --from=builder /app/dist/public ./client/dist
COPY --from=builder /app/dist/index.js ./dist/index.js
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# Expõe a porta usada pelo servidor
EXPOSE 3000

# Inicia a aplicação
CMD ["pnpm", "start"]
