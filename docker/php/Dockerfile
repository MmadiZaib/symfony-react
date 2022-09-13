FROM php:7.4-fpm
ARG TIMEZONE=Europe/Paris

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod uga+x /usr/local/bin/install-php-extensions && sync

RUN mkdir -p /usr/share/man/man1 && \
    apt-get update && apt-get install -y \
    pdftk \
    zlib1g-dev \
    libicu-dev \
    libxml2-dev \
    libzip-dev \
    libxext6 \
    libxrender1 \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libmemcached-dev \
    libpq-dev \
    wget \
    ghostscript \
    xfonts-base \
    xfonts-75dpi \
    fontconfig

## Install GIT
RUN apt-get update && dpkg --configure -a
RUN apt-get autoremove  && apt-get autoclean
RUN apt-cache search git
RUN apt-get install -y git

# Set timezone
RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && echo ${TIMEZONE} > /etc/timezone \
 && printf '[PHP]\ndate.timezone = "%s"\n', ${TIMEZONE} > /usr/local/etc/php/conf.d/tzone.ini \
 && "date"


RUN install-php-extensions \
    bcmath \
    gd \
    intl \
    memcached\
    pdo \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    soap \
    zip \
    xdebug \
    amqp \
    redis \
    sockets

# install xdebug
RUN echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "display_startup_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "display_errors = On" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.discover_client_host=true" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.idekey=\"PHPSTORM\"" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_port=9001" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox_0.12.5-1.stretch_amd64.deb \
 && dpkg -i wkhtmltox_0.12.5-1.stretch_amd64.deb \
 && apt install -y -f \
 && rm wkhtmltox_0.12.5-1.stretch_amd64.deb


# Install Composer
ENV COMPOSER_ALLOW_SUPERUSER=1 COMPOSER_MEMORY_LIMIT=-1
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
  && composer --version

#https://blog.rkl.io/en/blog/docker-based-php-7-symfony-4-development-environment
# disbale xdebug for composer
#RUN mkdir /usr/local/etc/php/conf.d.noxdebug \
#  && ln -s /usr/local/etc/php/conf.d/* /usr/local/etc/php/conf.d.noxdebug/ \
#  && unlink /usr/local/etc/php/conf.d.noxdebug/docker-php-ext-xdebug.ini \
#  && echo "alias composer='PHP_INI_SCAN_DIR=/etc/php.d.noxdebug/ /usr/local/bin/composer'" >> /etc/bashrc

WORKDIR "/var/www"
