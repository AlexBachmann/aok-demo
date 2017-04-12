#!/bin/bash

mkdir -p var/jwt
openssl genrsa -passout pass:$JWT_PASSPHRASE -out var/jwt/private.pem -aes256 4096
openssl rsa -pubout -passin pass:$JWT_PASSPHRASE -in var/jwt/private.pem -out var/jwt/public.pem