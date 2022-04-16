import { NoSQLPort } from '@/ports/nosql.port';
import { LinkedinRepositoryPort } from '../../ports/linkedin.repository.port';
import { IProfile } from '@/core/domain/interfaces/profile.interface';
import { Profile } from '@/core/domain/profile';

class LinkedinRepository implements LinkedinRepositoryPort {
  constructor(private db: NoSQLPort) {}

  async getLikedinProfile(): Promise<IProfile> {
    return await this.db.getLast();
  }

  async create(profile: Profile): Promise<IProfile> {
    return await this.db.create(profile.serialize());
  }
}

export { LinkedinRepository };
