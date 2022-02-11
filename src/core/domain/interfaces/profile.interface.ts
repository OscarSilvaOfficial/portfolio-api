import { ICertification } from './certification.interface';
import { IEducation } from './education.interface';
import { IExperience } from './experience.interface';

interface IProfile {
  photoUrl: string;
  name: string;
  occupation: string;
  headline: string;
  summary: string;
  experiences: Array<IExperience>;
  educations: Array<IEducation>;
  certifications: Array<ICertification>;
  updatedAt: Date;
}

export { IProfile };
