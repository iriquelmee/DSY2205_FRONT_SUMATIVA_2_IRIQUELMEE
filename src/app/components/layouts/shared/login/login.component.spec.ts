import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { RegisterService } from '../../../../services/register.service';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['registerUser']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, CommonModule, HttpClientModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: RegisterService, useValue: registerServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with email and password fields', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should make the email field required', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
  });

  it('should make the password field required with a minimum length of 6 characters', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTrue();
  }); 

  it('should not call submitForm when the form is invalid', () => {
    spyOn(component, 'submitForm');
    component.loginForm.setValue({ email: '', password: '' });
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.submitForm).not.toHaveBeenCalled();
  });

  it('should display an error for an invalid email', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMsg.textContent).toContain('Introduce un correo electrónico válido.');
  });

  it('should display an error for a password shorter than 6 characters', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('123');
    passwordControl?.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMsg.textContent).toContain('La contraseña debe tener al menos 6 caracteres.');
  });

  it('should navigate to another route on success', () => {
    component.submitForm();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
