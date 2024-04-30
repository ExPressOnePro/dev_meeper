# Используем PHP и Node.js для Laravel и npm
FROM php:8.1-fpm

# Устанавливаем необходимые зависимости
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    vim

RUN docker-php-ext-install pdo pdo_mysql


# Устанавливаем Node.js и npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Устанавливаем PHP-расширения
RUN docker-php-ext-install pdo mbstring exif pcntl bcmath gd

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Копируем файлы проекта
WORKDIR /var/www
COPY . /var/www

# Устанавливаем зависимости npm
RUN npm install

# Устанавливаем зависимости Laravel
RUN composer install

# Даём разрешения для папки storage и bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
