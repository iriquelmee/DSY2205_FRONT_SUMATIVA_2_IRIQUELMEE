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
    try {
      
      const { email, password } = this.loginForm.value;
  
      if (!email || !password) {
        throw new Error('Todos los campos son obligatorios.');
      }

      const userData = { email, password };
      this.registerService.authenticateUser(userData).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          alert('Login Exitoso!, redireccionaaremos a la tienda...');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error en login:', error);
          alert('Hubo un error al autenticar al usuario. Por favor intente nuevamente.');
        }
      );
    } catch (error: any) {
      console.error('Erro:', error.message);
      alert(error.message);
    }
  }
  
  
  //validanndo campos
  isFieldInvalid(campo: string): boolean {
    const control = this.loginForm.get(campo);
    return control?.touched && control?.invalid || false;
  }

}
