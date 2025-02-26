# Usar a imagem oficial do Node.js
FROM node:18

# Criar diretório da aplicação
WORKDIR /app

# Copiar os arquivos para o container
COPY package.json ./
COPY package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos para o container
COPY . .

# Expor a porta usada pela aplicação
EXPOSE 5000

# Definir o comando para rodar a aplicação
CMD ["npm", "start"]
