FROM php:7

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zlib1g-dev \
    libxml2-dev \
    wget
RUN docker-php-ext-install zip xmlrpc

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version

RUN wget https://phar.phpunit.de/phpunit.phar && chmod +x phpunit.phar && mv phpunit.phar /usr/local/bin/phpunit
RUN phpunit --version

#RUN cd /myapp && composer install

WORKDIR /myapp/src

EXPOSE 8081
