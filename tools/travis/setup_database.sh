#!/bin/bash

mysql -u root -e "SET PASSWORD FOR 'root'@'localhost' = PASSWORD('')"
#echo "CREATE DATABASE tekkl" | mysql -u root
bin/console doctrine:database:create --env=test
bin/console doctrine:schema:create --env=test
bin/console doctrine:fixtures:load -n --env=test