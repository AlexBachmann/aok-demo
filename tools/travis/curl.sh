#!/bin/bash

#curl -H "Content-Type: application/json" -X POST -d '{"_username":"admin", "_password":"password"}' http://tekkl.local/api/login_check
curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","email":"email@test.de","plainPassword":{"first": "test1234", "second": "test1234"}}' http://tekkl.local/api/user/register