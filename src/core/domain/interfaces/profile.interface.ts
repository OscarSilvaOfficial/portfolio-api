import { ICertification } from './certification.interface';
import { IEducation } from './education.interface';
import { IExperience } from './experience.interface';

interface IProfile {
  created_at_date: Date | number;
  profile_pic_url: string;
  full_name: string;
  occupation: string;
  headline: string;
  summary: string;
  experiences: Array<IExperience>;
  educations: Array<IEducation>;
  certifications: Array<ICertification>;
}

export { IProfile };
