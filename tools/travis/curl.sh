#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{"_username":"admin", "_password":"password"}' http://tekkl.local/api/login_check