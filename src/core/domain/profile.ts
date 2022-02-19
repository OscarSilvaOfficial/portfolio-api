import { ICertification } from './interfaces/certification.interface';
import { IEducation } from './interfaces/education.interface';
import { IExperience } from './interfaces/experience.interface';
import { IProfile } from './interfaces/profile.interface';

class Profile implements IProfile {
  created_at_date: Date;
  profile_pic_url: string;
  full_name: string;
  occupation: string;
  headline: string;
  summary: string;
  experiences: Array<IExperience>;
  educations: Array<IEducation>;
  certifications: Array<ICertification>;

  constructor(profile: IProfile) {
    this.profile_pic_url = profile.profile_pic_url;
    this.created_at_date = profile.created_at_date;
    this.full_name = profile.full_name;
    this.occupation = profile.occupation;
    this.headline = profile.headline;
    this.summary = profile.summary;
    this.experiences = profile.experiences;
    this.educations = profile.educations;
    this.certifications = profile.certifications;
  }
}

export { Profile };
