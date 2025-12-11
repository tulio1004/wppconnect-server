FROM node:18-bullseye

# -----------------------------
# 📌 CHROMIUM + DEPENDÊNCIAS
# -----------------------------
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
    unzip

# -----------------------------
# 📌 INSTALL GOOGLE CHROME
# -----------------------------
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install \
    && rm google-chrome-stable_current_amd64.deb

# Puppeteer vars for Chrome
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROME_DEVEL_SANDBOX=/usr/bin/google-chrome-stable

# -----------------------------
# 📌 WORKDIR
# -----------------------------
WORKDIR /usr/src/wpp-server

# -----------------------------
# 📌 INSTALL DEPENDENCIES
# -----------------------------
COPY package.json yarn.lock* package-lock.json* ./

RUN npm install --legacy-peer-deps

# -----------------------------
# 📌 COPY ALL FILES
# -----------------------------
COPY . .

# -----------------------------
# 📌 BUILD TYPESCRIPT
# -----------------------------
RUN npm run build

# -----------------------------
# 📌 EXPOSE PORT (Railway)
# -----------------------------
EXPOSE 8080

# -----------------------------
# 📌 START SERVER USING RAILWAY PORT
# -----------------------------
CMD ["sh", "-c", "PORT=$PORT npm start"]
