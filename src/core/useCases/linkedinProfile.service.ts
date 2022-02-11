import { LinkedinPort } from 'src/ports/linkedin.port';
import { LinkedinRepositoryPort } from '../../ports/linkedin.repository.port';
import { IProfile } from '../domain/interfaces/profile.interface';
import { Profile } from '../domain/profile';

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

  linkedinProfileDTO(responseData: any): Profile {
    const data = { ...responseData[0]._doc };
    const profile = new Profile(
      data.profile_pic_url,
      data.full_name,
      data.occupation,
      data.headline,
      data.summary,
      data.experiences,
      data.educations,
      data.certifications,
      data.updatedAt ? new Date(data.updatedAt) : new Date(),
    );
    return profile;
  }

  async getLikedinProfile(): Promise<IProfile> {
    const profileData = await this.repository.getLikedinProfile();
    return this.linkedinProfileDTO(profileData);
  }
}

export { linkedinProfileService };
