import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Favorite } from '../interfaces/Favorite.interface';
import { MyPet } from '../interfaces/MyPet.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  createFavorite(favorite: Favorite) {
    const url = `${base_url}/favorite/pets`;
    return this.http
      .post(url, favorite)
      .pipe(map<any, any>((res: { ok: boolean; pet: Favorite }) => res));
  }

  getFavorites(id: string) {
    const url = `${base_url}/favorite/pets/${id}`;
    return this.http
      .get(url)
      .pipe(
        map<any, any>(
          (res: { ok: boolean; favorites: Array<MyPet> }) => res.favorites
        )
      );
  }

  deleteFavorite(id: string) {
    const url = `${base_url}/favorite/${id}`;
    return this.http
      .delete(url)
      .pipe(map<any, any>((res: { ok: boolean; msg: string }) => res));
  }
}
