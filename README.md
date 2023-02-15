# Express - Typescript Boilerplate

A boilerplate/starter project for building Restful APIs with Express Typescript

# Table of Contents

- [Installation](#installation)
- [Structure](#structure)

## Installation

### manual

```
git clone https://github.com/mberktas/express-typescript-boilerplate
cd express-typescript-boilerplate
npm install
npm start
```

### with docker

```
git clone https://github.com/mberktas/express-typescript-boilerplate
cd express-typescript-boilerplate
docker-compose up
```

## Structure

```

src\
 |--__tests__\                     # Tests
    |--user\
        |--user.test.ts

 |--resources\
    |-- user  # API Resources
        |-- user.controller.ts     # Route controller (controller layer)
        |-- user.service.ts        # Business logic (service layer)
        |-- user.model.ts          # Mongoose model (data layer)
        |-- user.interface.ts      # Interface
        |-- user.dto.ts            # Dtos , validations
        |-- user.exception.ts      # Exceptions

 |--middlewares\                   # Custom express middlewares
    |--auth.middleware.ts          # JWT auth middleware
    |--error.middleware.ts         # Error middleware
    |--validation.middleware.ts    # Request validation middleware

 |--utils\                         # Utility classes and functions
    |--exceptions\                 # General exceptions
    |--interfaces\                 # Typescript interfaces
    |--config.ts                   # Config file
    |--swagger.ts                  # Swagger
    |--logger.ts                   # Logger
    |--token.ts                    # JWT

 |--app.ts                         # Express app
 |--index.ts                       # App entry point

```
