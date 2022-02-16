import { NoSQLPort } from '@/ports/nosql.port';
import { LinkedinRepositoryPort } from '../../ports/linkedin.repository.port';
import { IProfile } from '@/core/domain/interfaces/profile.interface';

class LinkedinRepository implements LinkedinRepositoryPort {
  db: NoSQLPort;

  constructor(db: NoSQLPort) {
    this.db = db;
  }

  async getLikedinProfile(): Promise<IProfile> {
    return await this.db.getLast();
  }

  async create(data: any): Promise<IProfile> {
    return await this.db.create(data);
  }
}

export { LinkedinRepository };
