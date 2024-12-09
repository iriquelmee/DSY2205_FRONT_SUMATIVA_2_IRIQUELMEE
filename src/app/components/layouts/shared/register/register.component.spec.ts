import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register.component';
import { RegisterService } from '../../../../services/register.service';
import { CommonModule } from '@angular/common';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['registerUser']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, CommonModule, HttpClientModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: RegisterService, useValue: registerServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with username, email, and password fields', () => {
    expect(component.registroForm.contains('email')).toBeTrue();
    expect(component.registroForm.contains('password')).toBeTrue();
  });

  it('should make the username field required', () => {
    const usernameControl = component.registroForm.get('email');
    usernameControl?.setValue('');
    expect(usernameControl?.valid).toBeFalse();
  });

  it('should make the email field required and valid', () => {
    const emailControl = component.registroForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should make the password field required with a minimum length of 6 characters', () => {
    const passwordControl = component.registroForm.get('password');
    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should display an error for an invalid email', () => {
    const emailControl = component.registroForm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMsg.textContent).toContain('Introduce un correo electrónico válido.');
  });

  it('should display an error for a password shorter than 6 characters', () => {
    const passwordControl = component.registroForm.get('password');
    passwordControl?.setValue('123');
    passwordControl?.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMsg.textContent).toContain('La contraseña debe tener al menos 6 caracteres.');
  });

});
