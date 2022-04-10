import { ICertification } from './interfaces/certification.interface';
import { IEducation } from './interfaces/education.interface';
import { IExperience } from './interfaces/experience.interface';
import { IProfile } from './interfaces/profile.interface';

class Profile implements IProfile {
  constructor(
    private _created_at_date: Date,
    private _profile_pic_url: string,
    private _full_name: string,
    private _occupation: string,
    private _headline: string,
    private _summary: string,
    private _experiences: Array<IExperience>,
    private _educations: Array<IEducation>,
    private _certifications: Array<ICertification>,
  ) {}

  public get created_at_date(): Date {
    return this._created_at_date;
  }

  public get profile_pic_url(): string {
    return this._profile_pic_url;
  }

  public get full_name(): string {
    return this._full_name;
  }

  public get occupation(): string {
    return this._occupation;
  }

  public get headline(): string {
    return this._headline;
  }

  public get summary(): string {
    return this._summary;
  }

  public get experiences(): Array<IExperience> {
    return this._experiences;
  }

  public get educations(): Array<IEducation> {
    return this._educations;
  }

  public get certifications(): Array<ICertification> {
    return this._certifications;
  }
}

export { Profile };
