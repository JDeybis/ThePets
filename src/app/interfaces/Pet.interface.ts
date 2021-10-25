import { PetType } from './PetType.interface';

export interface Pet {
  _id?: string;
  pet_type: PetType;
  name: string;
  age: string;
  description: string;
  image_url?: string;
}
