import { Pet } from './Pet.interface';

export interface MyPet {
  _id?: string;
  user: string;
  pet: Pet;
}
