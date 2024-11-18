import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers : [RegisterService, RouterLink]
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
    
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  loginTitle : string = "Auntenticate Aquí";
  loginForm!: FormGroup;

  submitForm() {
    const {  email, password, password2 } = this.loginForm.value;


    const userData = {
      email,
      password,
    };
    console.log(userData);
    alert("Componente en mantencion");

    // falta agregar servicio de autenticacion - ignacio riquelme
    // this.registerService.registerUser(userData).subscribe(
    //   (response) => {
    //     console.log('Registro exitoso', response);
    //     alert('Registro exitoso: Usuario registrado.');
    //     this.router.navigate(['/login']);
    //   },
    //   (error) => {
    //     console.error('Error en el registro', error);
    //   }
    // );
  }
  
  //validanndo campos
  isFieldInvalid(campo: string): boolean {
    const control = this.loginForm.get(campo);
    return control?.touched && control?.invalid || false;
  }

}
