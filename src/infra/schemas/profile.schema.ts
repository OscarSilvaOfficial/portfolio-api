import { Schema } from 'mongoose';
import { IProfile } from '../../core/domain/interfaces/profile.interface';

export const ProfileSchema = new Schema<IProfile>({
  photoUrl: String,
  name: String,
  occupation: String,
  headline: String,
  summary: String,
  experiences: Array,
  educations: Array,
  certifications: Array,
});
