import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetType } from 'src/app/interfaces/PetType.interface';
import { PetTypeService } from 'src/app/services/pet-type.service';
import { PetService } from 'src/app/services/pet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pets-form',
  templateUrl: './pets-form.component.html',
  styleUrls: ['./pets-form.component.css'],
})
export class PetsFormComponent implements OnInit {
  public aux: string = 'Crear';
  form!: FormGroup;
  files: File[] = [];
  petTypes: Array<PetType> = [];
  id: string = '';

  constructor(
    private petTypeService: PetTypeService,
    private petService: PetService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ id }) => {
      this.getPet(id);
    });
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      pet_type: ['', [Validators.required]],
      age: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.getTypes();
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getTypes() {
    this.petTypeService
      .getPetTypes()
      .subscribe((petTypes) => (this.petTypes = petTypes));
  }

  getPet(id: string) {
    if (id) {
      this.id = id;
      this.aux = 'Editar';
      this.petService.getPet(id).subscribe((pet) => this.form.setValue(pet));
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.id || this.id !== '') {
        this.petService.updatePet(this.id, this.form.value).subscribe((res) => {
          if (res.ok) {
            Swal.fire({
              title: `La mascota ${res.pet.name} se actualizo correctamente.`,
              icon: 'success',
            });
            this.router.navigateByUrl('/pages/mascotas');
          } else {
            Swal.fire({
              title: `Error`,
              icon: 'error',
            });
          }
        });
      } else {
        this.petService
          .createPet(this.form.value, this.files[0])
          .subscribe((res) => {
            if (res.ok) {
              Swal.fire({
                title: `La mascota ${res.pet.name} se creo correctamente.`,
                icon: 'success',
              });
              this.router.navigateByUrl('/pages/mascotas');
            } else {
              Swal.fire({
                title: `Error`,
                icon: 'error',
              });
            }
          });
      }
    }
  }
}
