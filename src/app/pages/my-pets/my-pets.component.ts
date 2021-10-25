import { Component, OnInit } from '@angular/core';
import { FavoritePet } from 'src/app/interfaces/FavoritePet.interface';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PetService } from 'src/app/services/pet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.css'],
})
export class MyPetsComponent implements OnInit {
  user!: User;
  favorites: Array<FavoritePet> = [];

  constructor(
    private petService: PetService,
    private auth: AuthService,
    private favoriteService: FavoritesService
  ) {
    this.user = this.auth.user;
  }

  ngOnInit(): void {
    this.getFavoritePets(this.user._id);
  }

  getFavoritePets(id: string) {
    this.petService.getFavoritePets(id).subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  addFavoritePets(id: string) {
    const favorite = {
      user: this.user._id,
      pet: id,
    };

    this.favoriteService.createFavorite(favorite).subscribe((res) => {
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Agregado a favoritos',
        });
        this.ngOnInit();
      }
    });
  }

  deleteFavoritePets(id: string) {
    this.petService.deleteFavorite(this.user._id, id).subscribe((res) => {
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Eliminado de favoritos',
        });
        this.ngOnInit();
      }
    });
  }
}
