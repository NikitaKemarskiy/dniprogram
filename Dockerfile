FROM node:12.11.0

# Папка с сертификатами
ARG SSL_DIR=/etc/ssl/
RUN mkdir -p ${SSL_DIR}

# Папка приложения
ARG APP_DIR=/var/www/dniprogram
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Установка зависимостей
COPY package*.json ./
RUN npm install --production

# Копирование файлов проекта
COPY . .

# Уведомление о порте, который будет прослушивать работающее приложение
EXPOSE 80 443

# Переменные окружения
ENV NODE_ENV=production

# Запуск проекта
CMD ["npm", "start"]