import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Favorite } from '../interfaces/Favorite.interface';
import { FavoritePet } from '../interfaces/FavoritePet.interface';
import { Pet } from '../interfaces/Pet.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getPets() {
    const url = `${base_url}/pets`;
    return this.http
      .get(url)
      .pipe(map<any, Pet[]>((res: { ok: boolean; pets: Pet[] }) => res.pets));
  }

  getFavoritePets(id: string) {
    const url = `${base_url}/pets/favorites/${id}`;
    return this.http
      .get(url)
      .pipe(
        map<any, FavoritePet[]>(
          (res: { ok: boolean; favorites: Array<FavoritePet> }) => res.favorites
        )
      );
  }

  getPet(id: string) {
    const url = `${base_url}/pets/${id}`;
    return this.http
      .get(url)
      .pipe(map<any, Pet>((res: { ok: boolean; pet: Pet }) => res.pet));
  }

  createPet(pet: any, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', pet.name);
    formData.append('age', pet.age);
    formData.append('pet_type', pet.pet_type);
    formData.append('description', pet.description);
    const url = `${base_url}/pets/create`;
    return this.http
      .post(url, formData)
      .pipe(map<any, any>((res: { ok: boolean; pet: Pet }) => res));
  }

  /*createPet(pet: Pet) {
    const url = `${base_url}/pets/create`;
    return this.http
      .post(url, pet)
      .pipe(map<any, any>((res: { ok: boolean; pet: Pet }) => res));
  }*/

  updatePet(id: string, pet: Pet) {
    const url = `${base_url}/pets/${id}`;
    return this.http
      .put(url, pet)
      .pipe(map<any, any>((res: { ok: boolean; pet: Pet }) => res));
  }

  deletePet(pet: Pet) {
    const url = `${base_url}/pets/${pet._id}`;
    return this.http
      .delete(url)
      .pipe(map<any, any>((res: { ok: boolean; msg: string }) => res));
  }

  deleteFavorite(user: string, pet: string) {
    const url = `${base_url}/pets/favorites/${user}/${pet}`;
    return this.http
      .delete(url)
      .pipe(map<any, any>((res: { ok: boolean; msg: string }) => res));
  }
}
