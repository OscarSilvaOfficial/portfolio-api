import { LoggerPort } from '@/ports/logger.port';
import { LinkedinPort } from '@/ports/linkedin.port';
import { IProfile } from '@/core/domain/interfaces/profile.interface';
import { LinkedinRepositoryPort } from '@/ports/linkedin.repository.port';

class linkedinProfileService {
  repository: LinkedinRepositoryPort;
  linkedinAdapter: LinkedinPort;
  logger: LoggerPort;

  constructor(
    reporsitory: LinkedinRepositoryPort,
    linkedinAdapter: LinkedinPort,
    logger: LoggerPort,
  ) {
    this.repository = reporsitory;
    this.linkedinAdapter = linkedinAdapter;
    this.logger = logger;
  }

  private mountResponse(data: any) {
    data = data._doc ? data._doc : data;
    const profile = {
      created_at_date: Date.now(),
      profile_pic_url: data.profile_pic_url,
      full_name: data.full_name,
      occupation: data.occupation,
      headline: data.headline,
      summary: data.summary,
      experiences: data.experiences,
      educations: data.education,
      certifications: data.certifications,
    };
    return profile;
  }

  private async updateProfile() {
    return await this.linkedinAdapter
      .getLikedinProfile()
      .then(async (res: any) => {
        const response = this.mountResponse(res.data);
        return await this.repository
          .create(response)
          .then((res) => res)
          .catch(() => console.log('error'));
      });
  }

  private async getCurrentProfile() {
    return await this.repository.getLikedinProfile().then((res: any) => res[0]);
  }

  async getLikedinProfile(): Promise<IProfile> {
    let profile: any = await this.getCurrentProfile();

    const needUpdateProfile =
      new Date(profile.created_at_date).getDate() - new Date().getDate() == -7;

    if (needUpdateProfile) {
      this.logger.generalInfo('Updating profile', 'LinkedinProfileService');
      profile = await this.updateProfile();
    }

    return profile;
  }
}

export { linkedinProfileService };
