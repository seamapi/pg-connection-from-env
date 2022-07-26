import { parse as parsePg } from "pg-connection-string"

interface Options {
  /* If provided, overrides user */
  user?: string
  /* If provided, overrides database*/
  database?: string
  /* If provided, overrides process.env */
  env?: Object
  /* fallback defaults are used when the environment doesn't have a value */
  fallbackDefaults?: {
    user?: string
    host?: string
    port?: number
    database?: string
    databaseName?: string
    password?: string
  }
}

export const getPgConnectionFromEnv = (opts: Options = {}) => {
  const {
    user,
    env = process.env,
    database,
    fallbackDefaults: defaults = {},
  } = opts

  const uri =
    process.env.POSTGRES_URI ||
    process.env.PG_URI ||
    process.env.DATABASE_URL ||
    process.env.DATABASE_URI

  if (uri) {
    const uriObj = parsePg(uri)
    return {
      ...uriObj,
      database: database || uriObj.database,
      user: user || uriObj.user,
      ssl: uriObj.ssl
        ? { ...(uriObj as any).ssl, rejectUnauthorized: false }
        : false,
    }
  } else {
    return {
      host: process.env.POSTGRES_HOST || defaults.host || "localhost",
      user:
        user ||
        process.env.POSTGRES_USER ||
        process.env.POSTGRES_USERNAME ||
        defaults.user ||
        "postgres",
      port: process.env.POSTGRES_PORT || defaults.port || 5432,
      password:
        process.env.POSTGRES_PASS ||
        process.env.POSTGRES_PASSWORD ||
        defaults.password ||
        "",
      database:
        database ||
        process.env.POSTGRES_DATABASE ||
        process.env.POSTGRES_DB ||
        defaults.database ||
        defaults.databaseName ||
        "postgres",
      // TODO more refined ssl handling
      ssl: process.env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
    }
  }
}

export const getConnectionStringFromEnv = (opts: Options = {}) => {
  const uri =
    process.env.POSTGRES_URI ||
    process.env.PG_URI ||
    process.env.DATABASE_URL ||
    process.env.DATABASE_URI

  if (uri) return uri

  const { host, password, port, database, user } = getPgConnectionFromEnv(opts)
  // TODO sslmode?
  return `postgresql://${user}:${password}@${host}:${port}/${database}`
}

export default getPgConnectionFromEnv
