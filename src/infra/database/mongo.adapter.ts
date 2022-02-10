import { connect, model, Schema } from 'mongoose';
import { LoggerPort } from 'src/ports/logger.port';
import { NoSQLPort } from 'src/ports/nosql.port';
import { NestLoggerAdapter } from '../logger/nest.logger';

class MongoDB implements NoSQLPort {
  private logger: LoggerPort;
  private schema: Schema;
  private dbConnectionString: string;
  private dbName: string;
  private collection: any;

  constructor(
    dbConnectionString: string,
    dbName: string,
    collectionName: string,
    schema: Schema,
    logger: LoggerPort,
  ) {
    this.dbConnectionString = dbConnectionString;
    this.dbName = dbName;
    this.schema = schema;
    this.logger = logger;
    this.collection = model(collectionName, this.schema);
    this.createConnection();
  }

  private async createConnection() {
    await connect(`${this.dbConnectionString}/${this.dbName}`)
      .then(() => {
        this.logger.generalInfo('Connection success', 'MongoConnected');
      })
      .catch((err) => {
        this.logger.generalError('Mongo error', 'MongoConnectionError', err);
      });
  }

  changeSchema(schema: Schema) {
    this.schema = schema;
  }

  changeCollection(collectionName: string) {
    this.collection = model(collectionName, this.schema);
  }

  all(filter = {}) {
    return this.collection.find(filter);
  }

  create(data: any) {
    const newDocument = this.collection;
    const newData = new newDocument(data);
    return newData.save();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update(filter: any, data: any) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delete(filter: any) {}
}

export { MongoDB };
