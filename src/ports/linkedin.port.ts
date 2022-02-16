import { Profile } from '@/core/domain/profile';

interface LinkedinPort {
  getLikedinProfile(...params: any): Promise<Profile>;
}

export { LinkedinPort };
