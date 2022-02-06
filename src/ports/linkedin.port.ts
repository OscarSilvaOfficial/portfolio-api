import { Profile } from 'src/core/domain/profile';

interface LinkedinPort {
  getLikedinProfile(...params: any): Promise<Profile>;
}

export { LinkedinPort };
