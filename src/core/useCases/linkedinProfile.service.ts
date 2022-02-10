import { LinkedinPort } from 'src/ports/linkedin.port';
import { LinkedinRepositoryPort } from '../../ports/linkedin.repository.port';
import { IProfile } from '../domain/interfaces/profile.interface';

class linkedinProfileService {
  repository: LinkedinRepositoryPort;
  linkedinAdapter: LinkedinPort;

  constructor(
    reporsitory: LinkedinRepositoryPort,
    linkedinAdapter: LinkedinPort,
  ) {
    this.repository = reporsitory;
    this.linkedinAdapter = linkedinAdapter;
  }

  async getLikedinProfile(): Promise<IProfile> {
    return await this.repository.getLikedinProfile();
  }
}

export { linkedinProfileService };
