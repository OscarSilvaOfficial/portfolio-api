import { connect, model, Schema } from 'mongoose';
import { INoSQLDB } from 'src/ports/nosql.port';

class MongoDB implements INoSQLDB {
  private schema: Schema;
  private dbConnectionString: string;
  private dbName: string;
  private collection: any;

  constructor(
    dbConnectionString: string,
    dbName: string,
    collectionName: string,
    schema: Schema,
  ) {
    this.dbConnectionString = dbConnectionString;
    this.dbName = dbName;
    this.schema = schema;
    this.collection = model(collectionName, this.schema);
    this.createConnection();
  }

  private async createConnection() {
    await connect(`${this.dbConnectionString}/${this.dbName}`);
  }

  changeSchema(schema: Schema) {
    this.schema = schema;
  }

  changeCollection(collectionName: string) {
    this.collection = model(collectionName, this.schema);
  }

  all(filter: any = {}) {
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
