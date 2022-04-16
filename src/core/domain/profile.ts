import { ICertification } from './interfaces/certification.interface';
import { IEducation } from './interfaces/education.interface';
import { IExperience } from './interfaces/experience.interface';
import { IProfile } from './interfaces/profile.interface';

interface IProfileData {
  _created_at_date: Date | number;
  _profile_pic_url: string;
  _full_name: string;
  _occupation: string;
  _headline: string;
  _summary: string;
  _experiences: Array<IExperience>;
  _educations: Array<IEducation>;
  _certifications: Array<ICertification>;
}

class Profile implements IProfile {
  constructor(private profile: IProfileData) {}

  public get created_at_date(): Date | number {
    return this.profile._created_at_date;
  }

  public get profile_pic_url(): string {
    return this.profile._profile_pic_url;
  }

  public get full_name(): string {
    return this.profile._full_name;
  }

  public get occupation(): string {
    return this.profile._occupation;
  }

  public get headline(): string {
    return this.profile._headline;
  }

  public get summary(): string {
    return this.profile._summary;
  }

  public get experiences(): Array<IExperience> {
    return this.profile._experiences;
  }

  public get educations(): Array<IEducation> {
    return this.profile._educations;
  }

  public get certifications(): Array<ICertification> {
    return this.profile._certifications;
  }

  public serialize(): IProfile {
    return {
      created_at_date: this.created_at_date,
      profile_pic_url: this.profile_pic_url,
      full_name: this.full_name,
      occupation: this.occupation,
      headline: this.headline,
      summary: this.summary,
      experiences: this.experiences,
      educations: this.educations,
      certifications: this.certifications,
    };
  }
}

export { Profile };
