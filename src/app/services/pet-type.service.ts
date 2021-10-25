import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PetType } from '../interfaces/PetType.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PetTypeService {
  constructor(private http: HttpClient) {}

  getPetTypes() {
    const url = `${base_url}/types`;
    return this.http
      .get(url)
      .pipe(
        map<any, Array<PetType>>(
          (res: { ok: boolean; petTypes: Array<PetType> }) => res.petTypes
        )
      );
  }
}
