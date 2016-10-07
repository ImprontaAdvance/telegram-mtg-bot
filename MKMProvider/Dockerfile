FROM php:7

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zlib1g-dev \
    libxml2-dev
RUN docker-php-ext-install zip xmlrpc

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version

WORKDIR /myapp

EXPOSE 8081
