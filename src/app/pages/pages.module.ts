import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { PagesComponent } from './pages.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { PetsComponent } from './pets/pets.component';
import { PetsFormComponent } from './pets/pets-form/pets-form.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MyPetsComponent } from './my-pets/my-pets.component';
import { MyFavoritePetsComponent } from './my-favorite-pets/my-favorite-pets.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    PetsComponent,
    PetsFormComponent,
    MyPetsComponent,
    MyFavoritePetsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,

    NgxDropzoneModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PagesComponent],
})
export class PagesModule {}
