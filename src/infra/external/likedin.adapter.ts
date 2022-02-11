import { LinkedinPort } from '../../ports/linkedin.port';
import { Injectable } from '@nestjs/common';
import { IProfile } from 'src/core/domain/interfaces/profile.interface';
import { RequestPort } from 'src/ports/request.port';

@Injectable()
class LinkedinAdapter implements LinkedinPort {
  linkedinProfile: IProfile;
  request: RequestPort;

  constructor(requestAdapter: RequestPort) {
    this.request = requestAdapter;
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

  async getLikedinProfile(): Promise<any> {
    const profile = await this.getDataOnLinkedIn();
    return new Promise((resolve) => resolve(profile));
  }
}

export { LinkedinAdapter };
