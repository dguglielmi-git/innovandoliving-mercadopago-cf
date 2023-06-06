
# InnovandoLiving MercadoPago - (e-Commerce Backend)

This microservice works as a payment gateway utilizing MercadoPago. All transactions ran through it will be registered into the system's database.


## Getting Started 🚀

Regardless were you deploy this project, you must be able to set the environment variables that this microservice needs. Read the how to install steps in order to have this service online.


### Pre-requisites 📋

It is required to have installed NodeJS. You can install it on heroku, docker, aws or any other system that allows you to set environment variables.

### How to Install 🔧

After deploy in your selected system, you should define the values for the following environment variables:
MONGODB_CNN="url of your mongodb database"

ACCESS_TOKEN="Token from MercadoPago required for its connectivity"

SECRETJWTKEY="Secret Json Web Token key"

Below you will find some examples of the required format:
MONGODB_CNN=mongodb+srv://username:password@cluster0.m8scl.mongodb.net/collectionName
ACCESS_TOKEN=APP_USR-7283909654097762-020111-081a472d19b4d1fa123df44404e1a753-1057422018
SECRETJWTKEY=0ds24094-9873-22f3-7efe-e912d8f5fe20

## Deploy 📦

You can deploy on heroku, aws or any other system/cloud you like.


## Built with 🛠️

* [MercadoPago](https://www.npmjs.com/package/mercadopago) - This library provides developers with a simple set of bindings to help you integrate Mercado Pago API to a website and start receiving payments..
* [Jwt-Decode](https://www.npmjs.com/package/jwt-decode) - small browser library that helps decoding JWTs token which are Base64Url encoded.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.


## Version 📌

We used [SemVer](http://semver.org/) for versioning. Check out the whole version list available [tagsRepo](https://github.com/dguglielmi-git/innovandoliving-mercadopago/tags).


## Author ✒️

* **Daniel Guglielmi** - *Software Engineer* - [dguglielmi-git](https://github.com/dguglielmi-git)


## License 📄

No license required.

## Thanks 🎁

* To anyone who uses this project. 😇 

---
⌨️ with ❤️ by [dguglielmi-git](https://github.com/dguglielmi-git) 😊