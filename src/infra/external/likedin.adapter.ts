import { LinkedinPort } from '../../ports/linkedin.port';
import { Injectable } from '@nestjs/common';
import { Profile } from 'src/core/domain/profile';
import { IProfile } from 'src/core/domain/interfaces/profile.interface';
import { RequestPort } from 'src/ports/request.port';
import { AxiosAdapter } from './axios.adapter';
import info from '../../../linkedin.json';

@Injectable()
class LinkedinAdapter implements LinkedinPort {
  linkedinProfile: IProfile;
  request: RequestPort;

  constructor(requestAdapter: RequestPort) {
    this.request = requestAdapter;
  }

  private replaceValues(profile: any): IProfile {
    profile.experiences.map((experience: any) => {
      if (
        !(experience.starts_at instanceof Date) &&
        !(experience.ends_at instanceof Date)
      ) {
        experience.starts_at = new Date(
          experience.starts_at.year,
          experience.starts_at.month,
          experience.starts_at.day,
        );

        if (experience.ends_at) {
          experience.ends_at = new Date(
            experience.ends_at.year,
            experience.ends_at.month,
            experience.ends_at.day,
          );
        } else {
          experience.ends_at = null;
        }
      }
    });
    return profile;
  }

  private getDataOnLinkedIn(): Promise<IProfile> {
    const nubelaUrl = `${process.env.NUBELA_URL}/linkedin`;
    const linkedinProfileUrl = process.env.MY_LINKEDIN_URL;
    const requestUrl = `${nubelaUrl}?url=${linkedinProfileUrl}`;
    this.request.setHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${process.env.NUBELA_TOKEN}`,
    };
    return this.request.get(requestUrl);
  }

  private mountProfile(payload: any): Profile {
    return new Profile(
      payload.profile_pic_url,
      payload.first_name + ' ' + payload.last_name,
      payload.occupation,
      payload.headline,
      payload.summary,
      payload.experiences,
      payload.educations,
      payload.certifications,
    );
  }

  async defineQuery(linkedinQuery: boolean): Promise<any> {
    if (linkedinQuery) {
      const response = await this.getDataOnLinkedIn();
      return response;
    }
    return { data: this.replaceValues(info) };
  }

  async getLikedinProfile(linkedinQuery: boolean): Promise<Profile> {
    const response = await this.defineQuery(linkedinQuery);
    const profile = this.mountProfile(response.data);
    return new Promise((resolve) => resolve(profile));
  }
}

export { LinkedinAdapter };
