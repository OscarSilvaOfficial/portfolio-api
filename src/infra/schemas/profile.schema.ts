import { Schema } from 'mongoose';
import { IProfile } from '../../core/domain/interfaces/profile.interface';

export const ProfileSchema = new Schema<IProfile>({
  created_at_date: Date,
  profile_pic_url: String,
  full_name: String,
  occupation: String,
  headline: String,
  summary: String,
  experiences: Array,
  educations: Array,
  certifications: Array,
});
