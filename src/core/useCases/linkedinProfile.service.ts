import { LinkedinPort } from 'src/ports/linkedin.port';
import { LoggerPort } from 'src/ports/logger.port';
import { LinkedinRepositoryPort } from '../../ports/linkedin.repository.port';

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
      created_at_date: data.created_at_date,
      profile_pic_url: data.profile_pic_url,
      full_name: data.full_name,
      occupation: data.occupation,
      headline: data.headline,
      summary: data.summary,
      experiences: data.experiences,
      educations: data.educations,
      certifications: data.certifications,
    };
    return profile;
  }

  async getLikedinProfile(): Promise<any> {
    let profileData: any = await this.repository
      .getLikedinProfile()
      .then((res: any) => res[0]);

    const updateDb =
      new Date(profileData.created_at_date).getDate() - new Date().getDate();

    if (updateDb == -4) {
      this.logger.generalInfo('Updating profile', 'LinkedinProfileService');
      await this.linkedinAdapter.getLikedinProfile().then(async (res: any) => {
        const response = { ...res.data, created_at_date: Date.now() };
        profileData = await this.repository
          .create(this.mountResponse(response))
          .then((res) => res)
          .catch(() => console.log('error'));
      });
    }
    return profileData;
  }
}

export { linkedinProfileService };
