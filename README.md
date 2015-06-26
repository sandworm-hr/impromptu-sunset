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
    1. [Setting Up Test Environment](#test-environment)
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

From within the root directory:

```
npm install
```

npm install should install bower dependencies automatically.

### Test and Dev Environment

This repo contains client side and server side testing. To install:

1. Install the Postgres app from [http://postgresapp.com/](http://postgresapp.com/)
  - [Next, follow these instructions to set up your bash profile $PATH](http://postgresapp.com/documentation/cli-tools.html)
1. Run the Postgres app from your Applications folder
1. Install sequelize-cli
  - ```npm install -g sequelize-cli```
1. Create the database
  - In the terminal:
    - ``` psql ```
    - ``` create database dev
    - ``` create database test
1. Setup ``` server/config/config.json ```
  - ```js
    {
    "development": {
      "dialect": "postgres",
      "use_env_variable": "DATABASE_URL"
    },
    "test": {
      "dialect": "postgres",
      "use_env_variable": "TEST_DATABASE_URL",
      "logging": false
    },
    "production": {
      "dialect": "postgres",
      "use_env_variable": "DATABASE_URL"
    } 
    ```
}

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
