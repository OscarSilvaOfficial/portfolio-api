import { LinkedinPort } from '../../ports/linkedin.port';
import info from '../../../linkedin.json';
import { Injectable } from '@nestjs/common';
import { Profile } from 'src/core/domain/profile';
import { IProfile } from 'src/core/domain/interfaces/profile.interface';
import { RequestPort } from 'src/ports/request.port';
import { AxiosAdapter } from './axios.adapter';

@Injectable()
class LinkedinAdapter implements LinkedinPort {
  linkedinProfile: IProfile;
  request: RequestPort;

  constructor() {
    this.request = new AxiosAdapter();
  }

  private replaceValues(profile: any): any {
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

  private getDataOnLinkedIn(): any {
    const nubelaUrl = 'https://nubela.co/proxycurl/api/v2/linkedin';
    const linkedinProfileUrl = 'https://www.linkedin.com/in/dasilvaoscar';
    const requestUrl = `${nubelaUrl}?url=${linkedinProfileUrl}`;
    this.request.setHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${process.env.NUBELA_TOKEN}`,
    };
    return this.request.get(requestUrl);
  }

  getLikedinProfile(): any {
    const data = this.replaceValues(info);
    const profile = new Profile(
      data.profile_pic_url,
      data.first_name + ' ' + info.last_name,
      data.occupation,
      data.headline,
      data.summary,
      data.experiences,
      data.educations,
      data.certifications,
    );
    return new Promise((resolve) => resolve(profile));
  }
}

export { LinkedinAdapter };
