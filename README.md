## Description
DISCLAIMER: This application is a PoC and a challenge, it was done in a 'Hackathon' way over the course of only 5 days, so there's a lot of room for improvement.

Clean Architecture NestJs API Typescript w/ Prisma (Postgres as DB) - slot management application for creating appointments with professionals and more...

In Clean Architecture we have a decoupled system, layering it in a way that the core (our domain, entities) stays completely independent from
actual implementations or infrastructure. The application layer handles with all our use cases and services for the system, this layer is also
decoupled from our infrastructure, which means that if in any moment in the future we would like to change DB, ORM's and alikes, frameworks and other types
of infrastructure services we are able to do it without having to change anything in our application and domain layer, protecting our businnes rules.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

