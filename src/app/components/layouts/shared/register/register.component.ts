import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [DatePipe, RegisterService, RouterLink]
})
export class RegisterComponent {

  title: string = "Registrate Aquí";
  registroForm!: FormGroup;
  currentDate: string = "";

  //se asigna cosntrunctur abse componente
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private registerService: RegisterService,
    private router: Router
    
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bornDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });

    //dia de hoy
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  //evento que se ejecuta al hacer submit en formulario
  submitForm() {
    const { nombre, apellidos, email, bornDate, password, password2 } = this.registroForm.value;

    const currentDate = new Date();
    const formattedBornDate = this.datePipe.transform(bornDate, 'dd-MM-yyyy');
    const bornDateObj = new Date(bornDate);

    if (bornDateObj > currentDate) {
      console.error('La fecha de nacimiento no puede ser futura.');
      return;
    }

    if (password !== password2) {
      console.error('Las contraseñas no coinciden.');
      return;
    }

    const userData = {
      nombre,
      apellidos,
      email,
      bornDate: formattedBornDate,
      password,
    };
    console.log(userData);

    this.registerService.registerUser(userData).subscribe(
      (response) => {
        console.log('Registro exitoso', response);
        alert('Registro exitoso: Usuario registrado.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro', error);
      }
    );
  }
  

  //validanndo campos
  isFieldInvalid(campo: string): boolean {
    const control = this.registroForm.get(campo);
    return control?.touched && control?.invalid || false;
  }
  

}
