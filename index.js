const getConnectionInfo = (database, user) => {
  if (singletonDB)
    return {
      ...singletonDB.connection,
      database: database || singletonDB.connection.database,
      user: user || singletonDB.connection.user,
    }
  const uri =
    process.env.POSTGRES_URI ||
    process.env.PG_URI ||
    process.env.DATABASE_URL ||
    process.env.DATABASE_URI

  if (uri) {
    const uriObj = parsePG(uri)
    return {
      ...uriObj,
      database: database || uriObj.database,
      user: user || uriObj.user,
      ssl: uriObj.ssl ? { ...uriObj.ssl, rejectUnauthorized: false } : false,
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
      ssl: process.env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
    }
  }
}

const getConnectionString = (...args) => {
  const { host, password, port, database, user } = getConnectionInfo(...args)
  // TODO sslmode?
  return `postgresql://${user}:${password}@${host}:${port}/${database}`
}
