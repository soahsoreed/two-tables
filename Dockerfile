# Используем официальный образ Node.js как базовый для этапа сборки
FROM node:22.1.0 AS build

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальную часть исходного кода
COPY . .

# Собираем приложение
RUN npm run force-build

# Используем Nginx для обслуживания собранного приложения
FROM nginx:alpine

# Копируем сборку React-приложения в Nginx директорию
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
