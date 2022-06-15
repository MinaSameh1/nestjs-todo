## Description

A simple Project created while learning nestjs, class-validator, and prisma.

It is hosted on heroku so give it a second to come online. https://nestjs-tst-todo.herokuapp.com/    
There is a [postman file](https://github.com/MinaSameh1/nestjs-todo/blob/main/test/Crudapp.postman_collection.json) with the endpoints.

## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Create the db and run docker container, and run prisma migrate deploy
$ npm run db:dev:restart
```

## Resources
[Nestjs REST Api](https://www.youtube.com/watch?v=GHTA143_b-s)

[Nestjs AccessToken and RefreshToken](https://github.com/vladwulf/nestjs-jwts)

[Nestjs and prisma official docs](https://docs.nestjs.com/recipes/prisma)

[Structure Used](https://github.com/CatsMiaow/node-nestjs-structure)

## License
[MIT licensed](LICENSE).
