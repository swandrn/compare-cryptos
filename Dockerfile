# syntax=docker/dockerfile:1

FROM php:8.3.8-apache
COPY . /var/www/html
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
RUN docker-php-ext-install pdo_mysql
USER www-data