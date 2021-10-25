import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/interfaces/Pet.interface';
import { PetService } from 'src/app/services/pet.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  pets: Array<Pet> = [];
  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.petService.getPets().subscribe((pets) => (this.pets = pets));
  }

  deletePet(pet: Pet) {
    Swal.fire({
      title: `Estas seguro de Eliminar a ${pet.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.petService.deletePet(pet).subscribe((res) => {
          if (res.ok) {
            Swal.fire('Eliminado!', 'La mascota ah sido eliminada', 'success');
            this.getPets();
          }
        });
      }
    });
    //this.petService.deletePet(id).subscribe((res) => {});
  }
}
