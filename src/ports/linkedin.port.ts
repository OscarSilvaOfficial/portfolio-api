import { Profile } from 'src/core/domain/profile';

interface LinkedinPort {
  getLikedinProfile(params: undefined): Promise<Profile>;
}

export { LinkedinPort };
