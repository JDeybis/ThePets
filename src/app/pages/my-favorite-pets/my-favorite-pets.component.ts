import { Component, OnInit } from '@angular/core';
import { FavoritePet } from 'src/app/interfaces/FavoritePet.interface';
import { MyPet } from 'src/app/interfaces/MyPet.interface';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-favorite-pets',
  templateUrl: './my-favorite-pets.component.html',
  styleUrls: ['./my-favorite-pets.component.css'],
})
export class MyFavoritePetsComponent implements OnInit {
  favorites: Array<MyPet> = [];
  user!: User;

  constructor(
    private auth: AuthService,
    private favoritePets: FavoritesService
  ) {
    this.user = this.auth.user;
  }

  ngOnInit(): void {
    this.getMyFavorites(this.user._id);
  }

  getMyFavorites(id: string) {
    this.favoritePets
      .getFavorites(id)
      .subscribe((favorites) => (this.favorites = favorites));
  }

  deleteFavorite(id: string) {
    this.favoritePets.deleteFavorite(id).subscribe((res) => {
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
