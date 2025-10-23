# Instruções de Deployment

## Com Docker

### Build da imagem
```bash
docker build -t jane-souza-imoveis .
```

### Executar o container
```bash
docker run -p 3000:3000 jane-souza-imoveis
```

O site estará disponível em `http://localhost:3000`

## Variáveis de Ambiente

Se necessário, você pode passar variáveis de ambiente:

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  jane-souza-imoveis
```

## Docker Compose (opcional)

Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

E execute:
```bash
docker-compose up
```

## Sem Docker

### Instalação
```bash
pnpm install
```

### Build
```bash
pnpm run build
```

### Executar
```bash
pnpm start
```

## Informações do Site

- **Consultora**: Jane Souza
- **WhatsApp**: +55 11 99281-7555
- **Instagram**: @jay_consultora_cury
- **Especialidade**: Apartamentos em São Paulo
