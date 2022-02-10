import { NoSQLPort } from '../../ports/nosql.port';
import { IProfile } from '../../core/domain/interfaces/profile.interface';
import { LinkedinRepositoryPort } from '../../ports/linkedin.repository.port';

class LinkedinRepository implements LinkedinRepositoryPort {
  db: NoSQLPort;

  constructor(db: NoSQLPort) {
    this.db = db;
  }

  async getLikedinProfile(filters: any): Promise<IProfile> {
    return await this.db.all(filters);
  }

  async create(data: any): Promise<any> {
    return await this.db.create(data);
  }
}

export { LinkedinRepository };
