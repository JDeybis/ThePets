import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './pets/pets.component';
import { PetsFormComponent } from './pets/pets-form/pets-form.component';
import { MyFavoritePetsComponent } from './my-favorite-pets/my-favorite-pets.component';
import { MyPetsComponent } from './my-pets/my-pets.component';

const child_routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'mascotas',
    component: PetsComponent,
  },
  {
    path: 'mascotas/crear',
    component: PetsFormComponent,
  },
  {
    path: 'mascotas/edit/:id',
    component: PetsFormComponent,
  },
  {
    path: 'mascotas/normal',
    component: MyPetsComponent,
  },
  {
    path: 'mis-mascotas',
    component: MyFavoritePetsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(child_routes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
