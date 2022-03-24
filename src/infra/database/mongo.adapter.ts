import { connect, model, Schema } from 'mongoose';
import { LoggerPort } from '@/ports/logger.port';
import { NoSQLPort } from '@/ports/nosql.port';
import { ProfileSchema } from '../schemas/profile.schema';

export class MongoAdapter implements NoSQLPort {
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

  setSchema(schema: Schema) {
    this.schema = schema;
  }

  setCollection(collectionName: string) {
    this.collection = model(collectionName, this.schema);
  }

  getLast() {
    return this.collection.find().sort({ _id: -1 }).limit(1);
  }

  all(filter = {}) {
    return this.collection.find(filter);
  }

  create(data: any) {
    const newDocument = this.collection;
    const newData = new newDocument(data);
    return newData.save();
  }

  static factory(logger: LoggerPort) {
    const mongoURL: string = process.env.MONGO_URL || '';
    return new MongoAdapter(
      mongoURL,
      'portfolio',
      'profiles',
      ProfileSchema,
      logger,
    );
  }
}
