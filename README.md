# Impromptu Sunset (name pending)

> Pithy project description

## Team

  - __Product Owner__: Bahia ElSharkawy
  - __Scrum Master__: Peter Espe
  - __Development Team Members__: JD Davis

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Server Environment Setup](#server-environment-setup)
    1. [Client Environment Setup](#client-environment-setup)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

```
npm install
```

NPM should install bower dependencies automatically.


### Server Environment Setup

#### Description
Follow these instructions to get Postgres up and running for a the dev and test environment.

#### Install Postgres
- Install the Postgres app from [http://postgresapp.com/](http://postgresapp.com/)
  - [Next, follow these instructions to set up your bash profile $PATH](http://postgresapp.com/documentation/cli-tools.html)
- Run the Postgres app from your Applications folder

#### Install Sequelize-CLI
- ```npm install -g sequelize-cli```

#### Create the Postgres Database
- In the terminal run the following in order:
  - ```psql```
  - ```create database dev```
  - ```create database test```
- Create the file ```.env``` in the root directory with these contents:
```
  DATABASE_URL=postgres://YOUR_MAC_USERNAME@localhost:5432/dev
  TEST_DATABASE_URL=postgres://YOUR_MAC_USERNAME@localhost:5432/test
```
- be sure to change ```YOUR_MAC_USERNAME``` in ```.env``` to your actual Mac username
  - if you don't know your username, type ```echo $USER``` into the terminal

#### Create Personal Config   
- create ``` server/config/personal_config.json ```
``` js
{
"development": {
  "username": "YOUR_MAC_USERNAME",
  "password": null,
  "database": "dev",
  "host": "127.0.0.1",
  "dialect": "postgres"
},
"test": {
  "username": "YOUR_MAC_USERNAME",
  "password": null,
  "database": "test",
  "host": "127.0.0.1",
  "dialect": "postgres"
}

```
  - be sure to change ```YOUR_MAC_USERNAME``` in ```server/config/personal_config.json```to your actual Mac username
  - from inside the ```/server``` folder run this in terminal
    - ```sequelize db:migrate --config config/personal_config.json```

### Client Environment Setup

#### Description
Follow these instructions if you want Karma to re-run the tests automatically on a file change.

#### Install the Karma Command Line Tool

```npm install -g karma-cli```

#### Start Karma

```karma start```

### Run Tests

To run the tests after installing, simply type ```grunt test``` into the command line from the root directly.



### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
