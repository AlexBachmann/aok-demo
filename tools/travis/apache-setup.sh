#!/bin/bash

# defaults
SITE_DIR="/tmp/site"
SITE_URL="http://site.dev"
SITE_HOST="127.0.0.1"
PHP_VERSION="5.6"

PARSED_OPTIONS=$(getopt -n "$0"  -o 'd::,u::,h::,p::' --long "dir::,url::,host::,php::"  -- "$@")

#Bad arguments, something has gone wrong with the getopt command.
if [ $? -ne 0 ];
then
  exit 1
fi

eval set -- "$PARSED_OPTIONS"

# extract options and their arguments into variables.
while true ; do
    case "$1" in
        -d|--dir ) SITE_DIR="$(echo $2| cut -d'=' -f 2)"; shift 2;;
        -u|--url ) SITE_URL="$(echo $2| cut -d'=' -f 2)"; shift 2;;
        -h|--host ) SITE_HOST="$(echo $2| cut -d'=' -f 2)"; shift 2;;
        -p|--php ) PHP_VERSION="$(echo $2| cut -d'=' -f 2)"; shift 2;;
        --) shift; break;;
    esac
done

BREATH="\n\n"
SEP="================================================================================\n"

echo "Variables"
printf $SEP
printf $BREATH
echo "$SITE_DIR"
printf $BREATH
echo "$SITE_URL"
printf $BREATH
echo "$SITE_HOST"
printf $BREATH
echo "$PHP_VERSION"
printf $BREATH

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
SCRIPT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

echo "Script executing from path $SCRIPT_DIR"
printf $BREATH
echo "Updating and installing apache2 packages"
printf $SEP

apt-get update
apt-get install -y --force-yes apache2 libapache2-mod-fastcgi make
#apt-get install -y --force-yes php5-dev php-pear php5-mysql php5-gd php5-json php5-sqlite php5-pgsql
a2enmod headers

printf $BREATH
echo "Create apache root directory of it does not exist"
printf $SEP
echo "$SITE_DIR"
mkdir -p $SITE_DIR

printf $BREATH
echo "Add executable rights to /home/travis directiry"
printf $SEP
chmod +x /home/travis

printf $BREATH
echo "Enabling php-fpm"
printf $SEP

if [[ ${PHP_VERSION:0:1} == "5" ]]; then 
  echo "We are in PHP5"
  groupadd nobody;
  # mkdir -p ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.d/
  # cd ~/.phpenv/versions/$PHP_VERSION/etc/
  # ls -la
  # cat ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.conf.default
  cp $SCRIPT_DIR/assets/www.conf ~/.phpenv/versions/$PHP_VERSION/etc/conf.d/;
  cp -f $SCRIPT_DIR/assets/travis-ci-apache-php5 /etc/apache2/sites-available/default.conf
  cp $SCRIPT_DIR/assets/php5-fpm.conf ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.conf
  a2enmod rewrite actions fastcgi alias
  ~/.phpenv/versions/$PHP_VERSION/sbin/php-fpm
fi

# credit: https://www.marcus-povey.co.uk/2016/02/16/travisci-with-php-7-on-apache-php-fpm/
if [[ ${PHP_VERSION:0:1} == "7" ]]; then
  echo "We are in PHP7"
  # mkdir -p ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.d/
  # cat ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.conf.default
  cp $SCRIPT_DIR/assets/www.conf ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.d/;
  cp -f $SCRIPT_DIR/assets/travis-ci-apache-php7 /etc/apache2/sites-available/default.conf
  cp ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.conf.default ~/.phpenv/versions/$PHP_VERSION/etc/php-fpm.conf
  a2enmod rewrite actions fastcgi alias
  echo "cgi.fix_pathinfo = 1" >> ~/.phpenv/versions/$PHP_VERSION/etc/php.ini
  ~/.phpenv/versions/$PHP_VERSION/sbin/php-fpm
fi

printf $BREATH
echo "Configuring Apache virtual hosts"
printf $SEP
echo "Apache default virtual host configuration will be overwritten to serve $SITE_URL from $SITE_DIR"

sed -e "s?%DIR%?$SITE_DIR?g" --in-place /etc/apache2/sites-available/default.conf
sed -e "s?%URL%?$SITE_URL?g" --in-place /etc/apache2/sites-available/default.conf
echo \n | tee --append /etc/hosts > /dev/null
echo "$SITE_HOST $SITE_URL" | tee --append /etc/hosts > /dev/null

a2ensite default

printf $BREATH
echo "Restarting Apache"
printf $SEP

service apache2 restart
