import { LoggerPort } from '@/ports/logger.port';
import { LinkedinPort } from '@/ports/linkedin.port';
import { IProfile } from '@/core/domain/interfaces/profile.interface';
import { LinkedinRepositoryPort } from '@/ports/linkedin.repository.port';
import { Profile } from '../domain/profile';

class linkedinProfileService {
  constructor(
    private repository: LinkedinRepositoryPort,
    private linkedinAdapter: LinkedinPort,
    private logger: LoggerPort,
  ) {}

  private mountEntity(data: any) {
    data = data._doc ? data._doc : data;
    return new Profile({
      _created_at_date: Date.now(),
      _profile_pic_url: data.profile_pic_url,
      _full_name: data.full_name,
      _occupation: data.occupation,
      _headline: data.headline,
      _summary: data.summary,
      _experiences: data.experiences,
      _educations: data.education,
      _certifications: data.certifications,
    });
  }

  private async updateProfile() {
    const linkedinProfile = await this.linkedinAdapter.getLikedinProfile();
    const linkedinProfileSerialized = this.mountEntity(linkedinProfile);
    return await this.repository.create(linkedinProfileSerialized);
  }

  private async getCurrentProfile() {
    return await this.repository.getLikedinProfile().then((res: any) => res[0]);
  }

  private needUpdateProfileData(lastProfileUpdate: Profile): boolean {
    const daysToUpdate =
      new Date(lastProfileUpdate.created_at_date).getDate() -
      new Date().getDate();
    this.logger.generalInfo(
      `Perfil foi atualizado ${
        daysToUpdate == 0 ? 'hoje' : 'a ' + daysToUpdate.toString() + ' dias'
      }`,
      'Time to update',
    );
    return daysToUpdate > 0 || daysToUpdate < 0;
  }

  async getLikedinProfile(): Promise<IProfile> {
    let profile: any = await this.getCurrentProfile();
    const needUpdateProfile = this.needUpdateProfileData(profile);

    if (needUpdateProfile) {
      this.logger.generalInfo('Updating profile', 'LinkedinProfileService');
      profile = await this.updateProfile();
    }

    return profile;
  }
}

export { linkedinProfileService };
