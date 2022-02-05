import { IProfile } from 'src/core/domain/interfaces/profile.interface';

interface LinkedinPort {
  getLikedinProfile(): Promise<IProfile>;
}

export { LinkedinPort };
