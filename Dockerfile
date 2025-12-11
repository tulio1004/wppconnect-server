FROM node:18-bullseye

# -----------------------------------
# 1) Dependências do Chrome / Puppeteer
# -----------------------------------
RUN apt-get update && apt-get install -y \
    wget \
    fonts-liberation \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    libnss3 \
    ca-certificates \
    xdg-utils \
    libgbm-dev \
    libxshmfence-dev \
    unzip \
  && rm -rf /var/lib/apt/lists/*

# -----------------------------------
# 2) Instala Google Chrome
# -----------------------------------
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install \
    && rm google-chrome-stable_current_amd64.deb

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# -----------------------------------
# 3) Diretório da aplicação
# -----------------------------------
WORKDIR /usr/src/wpp-server

# Copia apenas arquivos de dependência primeiro (melhor cache)
COPY package.json yarn.lock* package-lock.json* ./

# Resolve as dependências mesmo com conflitos de peer-deps
RUN npm install --legacy-peer-deps

# Copia o resto do projeto
COPY . .

# Compila o TypeScript -> dist/
RUN npm run build

# -----------------------------------
# 4) Criar usuário NÃO-root para rodar o Chrome
# -----------------------------------
RUN useradd -m pptruser && \
    mkdir -p /usr/src/wpp-server/userDataDir && \
    chown -R pptruser:pptruser /usr/src/wpp-server

USER pptruser

# -----------------------------------
# 5) Porta + Start
# -----------------------------------
EXPOSE 8080

CMD ["sh", "-c", "PORT=${PORT:-8080} npm start"]
