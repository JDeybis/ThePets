import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    this.formSubmitted = true;
    if (!this.form.valid) {
      Swal.fire({
        text: 'Ingrese el email correctamente.',
        icon: 'warning',
      });
      return;
    }

    this.service.login(this.form.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl('pages/home');
      },
      (err) => {
        if (err.status === 400)
          Swal.fire({
            text: err.error.msg,
            icon: 'warning',
          });
        else
          Swal.fire({
            text: err.error.msg,
            icon: 'error',
          });
      }
    );
  }
}
