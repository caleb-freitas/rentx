<h1 align="center">RentX</h1>

## Project

This is an application created to rent all sort of vehicles

## How to execute

- Clone the repository
- Go to the folder that was cloned `rentx`
- Add database credentials to `ormconfig-example.json` file and rename it to `ormconfig.json`
- Run `yarn install` to install the dependencies
- Run `docker-compose up -d` to build and create containers
- Run `yarn typeorm migration:run` to create the tables on the database
- Run `yarn start`

After successfully executing all the commands above, just access `http://localhost:3000/api-docs` to see the documentation of all routes available in the application

## Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [Jest](https://jestjs.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## License

This project is under MIT license. See the [LICENSE](LICENSE.md) file for more details.
