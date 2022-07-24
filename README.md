# pg-connection-from-env

Convert environment variables into a usable postgres connection object or postgres uri

## Installation

`yarn add pg-connection-from-env`

## Usage

```ts
import getPgConnectionFromEnv from "pg-connection-from-env"

getPgConnectionFromEnv()
// TODO

getPgConnectionFromEnv({
  fallbackDefaults: {
    user: "userifenvdoesntprovide",
    database: "databaseifenvdoesntprovide",
  },
})
// TODO
```

## Arguments

| Argument           | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `fallbackDefaults` | Defaults if env does not provide host, database, user etc. |
| `user`             | Override user with this                                    |
| `database`         | Override env database with this                            |
| `env`              | Environment object to use instead of process.env           |

## Environment Variables

The following environment variables are used (basically standard postgres env variables)

| Var Name                         | Description                     |
| -------------------------------- | ------------------------------- |
| POSTGRES_HOST                    | Postgres Host                   |
| POSTGRES_PASS, POSTGRES_PASSWORD | Postgres Password               |
| POSTGRES_DATABASE, POSTGRES_DB   | Postgres Database               |
| POSTGRES_USER, POSTGRES_USERNAME | Postgres User                   |
| POSTGRES_PORT                    | Postgres Port                   |
| POSTGRES_URI, POSTGRES_URL       | Postgres URI `postgresql://...` |
| POSTGRES_SSL                     | If set, true                    |
