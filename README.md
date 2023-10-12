<!--
title: 'AWS Serverless + lambda + api gateway + prisma'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://gitlab.com/magictree/serevrless-lambda-apigateway'
authorName: 'agustriadji'
-->

# AWS Serverless Express Prisma

## APIDOC

documentation api with postman file : ["APIDOC for Serverless-prisma-express Inspiro.postman_collection.json"](https://github.com/agustriadji/sam-express-prisma-inspiro/blob/main/APIDOC%20for%20Serverless-prisma-express%20Inspiro.postman_collection.json).

## Set DB in .env

```

DATABASE_URL = ${DATABASE_DIALECT}://${DATABASE_USER}:${DATABASE_PASSWD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DBNAME}
DATABASE_DBNAME = "forinspiro"
DATABASE_USER = "root"
DATABASE_PASSWD = "newpassword"
DATABASE_HOST = "localhost"
DATABASE_PORT = "3306"
DATABASE_DIALECT = "mysql"

```

## Usage

run serverless-offline, host default http://localhost:3000, EX: http://localhost:3000/endpoint

```bash
$ npm i
$ npx prisma migrate dev --name create-db
$ sls offline start
```
