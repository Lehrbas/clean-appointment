## Description
DISCLAIMER: This application is a PoC and a challenge, it was done in a 'Hackathon' way over the course of only 5 days, so there's a lot of room for improvement. The logger service is not really implemented in the classes and exception handling at the moment is very poor which can lead to some unexpected behavior. The focus of the project was creating a Clean Architecture PoC with the functionalities of the challenges. Also there are not any near the amount of unit tests and e2e tests necessary for a real world application.

There are comments all over the code to explain functionalities or design choices.

The project was designed and executed using DDD (Domain Driven Design) approach.

Clean Architecture NestJs API Typescript w/ Prisma (Postgres as DB) - slot management application for creating appointments with professionals and more...

In Clean Architecture we have a decoupled system, layering it in a way that the core (our domain, entities) stays completely independent from
actual implementations or infrastructure. The application layer handles all our use cases and services for the system, this layer is also
decoupled from our infrastructure, which means that if in any moment in the future we would like to change DB, ORM's and alikes, frameworks and other types
of infrastructure services we are able to do it without having to change anything in our application and domain layer, protecting our businnes rules.

There is also a implementation of a factory pattern for creating the entities, which also helps with testing.

The database was modeled using a Relational Star Scheme.

As of the endpoints my original idea was to create authentication routing groups based on the user's role, so that the admin could access all endpoints for managing records, professional only the the /availability and maybe the /appointments GET, and the customer had access to /appointment POST/GET/UPDATE and /slots GET. Also /auth would be public. Unfortunately I could not make time for it, but the base for it is all done.

Appointments have a 'status' propertie which is enumarated in the appointment-status.enum.ts file and there is further annotations about the system there.

There is a bunch of improvements to be made that are basic of a real world project, like Logging, better Validation Pipes, All Exception Handling, Shadow Database for tests...
Also I thought that would be nice to have a job scheduler and a ElasticSearch logs database, so that all old appointments could be replicated to this logs DB for further access and the "production" DB had a periodic job to keep it clean.

LUCIDCHART First design thinking: https://lucid.app/documents/view/b177a097-5e08-46ef-bc3d-29578c65a9c0

## Installation

- Clone the repository
```bash
# Via HTTPS
$ git clone https://github.com/Lehrbas/clean-appointment.git

# Via SSH
$ git clone git@github.com:Lehrbas/clean-appointment.git
```

I'm using pnpm because of the performance
- To install it:
```bash
$ npm i -g pnpm
```

- Install dependencies:
```bash
$ pnpm install
```

- Generate prisma files based on the schema (sometimes prisma generates the output folder inconsistently so that the import instead of .prisma/client is prisma/prisma-client if something like this happens just fix the import at prisma.service.ts - but it should not happen anymore - just in case =) )

```bash
$ npx prisma generate
```

- I'm using a postgresql for this app, if you already have a docker container with one you can use yours,
  in case you dont:
```bash
$ docker-compose -f docker-compose.db.yml up -d
```

I added a simple seed to add some users (1 customer, 1 professional, 1 admin), it runs automatically after the migrate command

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

## App usage

- You can use something like Postman or Insomnia for interacting with the API (I did not have time for swagger =( )

- Available endpoints are:
```
/api/slots
/api/appointments
/api/availabilities
/api/customers
/api/professionals
/api/users
```
- They all accept only a JSON body type request and the request properties are specified in their respective DTO's 
- For the get methods all endpoints except /slots accept a empty {} JSON body and return all records or you can pass their properties as filters for querying

- /api/users - body POST request example:
```
{
	"email": "pro@pro.com",
	"password": "secret",
	"role": "professional"
}
```
Possible role values: "professional", "customer", "admin"

- /api/customers - body POST request example:
```
{
	"userId": "ec424642-4558-4b7e-902a-212b0a88a0c4",
	"name": "Bob Sinclair"
}
```

- /api/professionals - body POST request example:
```
{
	"userId": "53c9a779-ba8d-4ec4-bfe4-cbe1c2832c44",
	"field": "Doctor",
	"name": "Mike Shinoda"
}
```


- /api/slots - GET - professionalId is required, but it also accepts a startsAt (not required) property so it filters all slots from startsAt date forward, ex:
```
{
  professionalId: "d0081d0b-8ceb-4292-a37a-053aa840a263",
  startsAt: "2023-02-10"
}
```
If no startsAt date is passed, it defaults to startOfToday()

- /api/availabilities requires the professionalId and a list of availabilities which have the timerange for the available times of that day, ex:
```
{
  professionalId: "d0081d0b-8ceb-4292-a37a-053aa840a263",
  availabilities: [
    ["2023-02-13T06:30:00.101Z", "2023-02-13T12:00:00.101Z"],
    ["2023-02-14T05:30:00.101Z", "2023-02-14T10:30:00.101Z"],
    ]
}
```

- /api/appointments POST example for creating an appointment

```
{
	"startsAt": "2023-02-18T10:30:00.000Z",
	"endsAt": "2023-02-18T11:30:00.000Z",
	"customerId": "03c146a2-fc61-4fd0-bbf4-d1c3199a1a90",
	"professionalId": "d0081d0b-8ceb-4292-a37a-053aa840a263"
}
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e
```

