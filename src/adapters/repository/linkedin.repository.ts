import { NoSQLPort } from '../../ports/nosql.port';
import { LinkedinRepositoryPort } from '../../ports/linkedin.repository.port';

class LinkedinRepository implements LinkedinRepositoryPort {
  db: NoSQLPort;

  constructor(db: NoSQLPort) {
    this.db = db;
  }

  async getLikedinProfile(): Promise<any> {
    return await this.db.getLast();
  }

  async create(data: any): Promise<any> {
    return await this.db.create(data);
  }
}

export { LinkedinRepository };
