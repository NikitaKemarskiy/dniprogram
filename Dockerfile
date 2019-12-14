FROM node:12.11.0

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

# Запуск проекта
CMD ["npm", "start"]