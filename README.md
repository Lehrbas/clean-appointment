## Description
DISCLAIMER: This application is a PoC and a challenge, it was done in a 'Hackathon' way over the course of only 5 days, so there's a lot of room for improvement.

Clean Architecture NestJs API Typescript w/ Prisma (Postgres as DB) - slot management application for creating appointments with professionals and more...

In Clean Architecture we have a decoupled system, layering it in a way that the core (our domain, entities) stays completely independent from
actual implementations or infrastructure. The application layer handles all our use cases and services for the system, this layer is also
decoupled from our infrastructure, which means that if in any moment in the future we would like to change DB, ORM's and alikes, frameworks and other types
of infrastructure services we are able to do it without having to change anything in our application and domain layer, protecting our businnes rules.

## Installation

- Clone the repository
```bash
# Via HTTPS
$ git clone https://github.com/Lehrbas/clean-appointment.git

#Via SSH
$ git clone git@github.com:Lehrbas/clean-appointment.git
```

- I'm using pnpm because of the performance
- To install it:
```bash
$ npm i -g pnpm
```

- Install dependencies:
```bash
$ pnpm install
```

- Generate prisma files based on the schema
```bash
$ npx prisma generate
```

- I'm using a postgresql for this app, if you already have a docker container with one you can use yours,
  in case you dont:
```bash
$ docker-compose -f docker-compose.db.yml up -d
```

- Run migration
```bash
$ npx prisma migrate dev --name init
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e
```

