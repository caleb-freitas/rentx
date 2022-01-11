<h1 align="center">RentX</h1>

## Description

This is a RESTFul API for renting vehicles.

## How to run

### 1. Clone the repository

```bash
$ git clone git@github.com:caleb-freitas/rentx.git
```

### 2. Install the dependencies

```bash
$ yarn install
```

### 3. Build, create, start and attach service to containers

It is important that you check the database credentials in the `ormconfig.json` file and, if necessary, change it.
Also, you need to create a database named `rentx` according to what is in the ormconfig.json configuration file.

```bash
$ docker-compose up -d
```

### 4. Run the migrations

```bash
$ yarn typeorm migration:run
```

### 5. Check if the server is running

The expected output is `Server running on port 3000...`

```bash
$ docker logs rentx -d
```

## Documentation

After running all the above commands successfully, just access `http://localhost:3000/api-docs` to access the documentation of all routes available in the application.

## Technologies

Coming soon...

## License

This project is under MIT license. See the [LICENSE](LICENSE.md) file for more details.
