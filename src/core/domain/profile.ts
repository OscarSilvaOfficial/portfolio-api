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

  constructor(
    created_at_date: Date,
    profile_pic_url: string,
    full_name: string,
    occupation: string,
    headline: string,
    summary: string,
    experiences: Array<IExperience>,
    educations: Array<IEducation>,
    certifications: Array<ICertification>,
  ) {
    this.profile_pic_url = profile_pic_url;
    this.created_at_date = created_at_date;
    this.full_name = full_name;
    this.occupation = occupation;
    this.headline = headline;
    this.summary = summary;
    this.experiences = experiences;
    this.educations = educations;
    this.certifications = certifications;
  }
}

export { Profile };
