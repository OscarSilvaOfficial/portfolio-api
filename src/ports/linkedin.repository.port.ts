import { IProfile } from 'src/core/domain/interfaces/profile.interface';

export interface LinkedinRepositoryPort {
  getLikedinProfile(...params: any): Promise<IProfile>;
  create(data: any): Promise<any>;
}
