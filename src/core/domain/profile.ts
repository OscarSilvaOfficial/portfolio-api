import { ICertification } from './interfaces/certification.interface';
import { IEducation } from './interfaces/education.interface';
import { IExperience } from './interfaces/experience.interface';
import { IProfile } from './interfaces/profile.interface';

class Profile implements IProfile {
  photoUrl: string;
  name: string;
  occupation: string;
  headline: string;
  summary: string;
  experiences: Array<IExperience>;
  educations: Array<IEducation>;
  certifications: Array<ICertification>;
  updatedAt: Date;

  constructor(
    photoUrl: string,
    name: string,
    occupation: string,
    headline: string,
    summary: string,
    experiences: Array<IExperience>,
    educations: Array<IEducation>,
    certifications: Array<ICertification>,
    updatedAt: Date,
  ) {
    this.photoUrl = photoUrl;
    this.name = name;
    this.occupation = occupation;
    this.headline = headline;
    this.summary = summary;
    this.experiences = experiences;
    this.educations = educations;
    this.certifications = certifications;
    this.updatedAt = updatedAt;
  }
}

export { Profile };
