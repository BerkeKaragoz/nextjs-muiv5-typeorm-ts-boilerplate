import "reflect-metadata";
import { Connection, getConnectionManager } from "typeorm";
import { User } from "./entities/User";

const options = {
  default: {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE_NAME || "postgres",
    synchronize: process.env.NODE_ENV !== "production",

    entities: [
      User, // etc...
    ],
  },
};

const entitiesChanged = (prevEntities: any[], newEntities: any[]): boolean => {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
};

const updateConnectionEntities = async (
  connection: Connection,
  entities: any[],
) => {
  // @ts-ignore
  if (!entitiesChanged(connection.options.entities, entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
};

export const ensureConnection = async (
  name: string = "default",
): Promise<Connection> => {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (process.env.NODE_ENV !== "production") {
      // @ts-ignore
      await updateConnectionEntities(connection, options[name].entities);
    }

    return connection;
  }

  // @ts-ignore
  return await connectionManager.create({ name, ...options[name] }).connect();
};

export default ensureConnection;
