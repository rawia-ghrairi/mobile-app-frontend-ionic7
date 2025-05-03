import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,IonicModule,RouterModule]
})
export class AuthComponentComponent implements OnInit {
  screen: 'signin' | 'signup' | 'forget' = 'signin';
  loginForm: FormGroup;
  signupForm: FormGroup;
  isLoading: boolean = false;
  resetForm: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
  }

  ngOnInit() {}

  change(screen: 'signin' | 'signup' | 'forget') {
    this.screen = screen;
    this.loginForm.reset();
    this.signupForm.reset();
  this.resetForm.reset();
  }

  login() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    const { email, password, role } = this.loginForm.value;

    this.auth.userLogin({ email, password, role }).subscribe({
      next: (data) => {
        this.isLoading = false;
        // La redirection est maintenant gérée par AuthService
      },
          
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        // Ajouter ici un message d'erreur à l'utilisateur
      }
    });
  }
  

  register() {
    if (this.signupForm.invalid) {
      this.markFormGroupTouched(this.signupForm);
      return;
    }

    this.isLoading = true;
    const { name, email, password, role } = this.signupForm.value;

    this.auth.userRegister({ name, email, password, role }).subscribe({
      next: (data) => {
        this.isLoading = false;
        // Optionnel: Auto-login après inscription
        this.screen = 'signin';
        this.loginForm.patchValue({ email, password });
      },
      error: (error) => {
        console.error('Register error:', error);
        this.isLoading = false;
      }
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      const payload = {
        email: this.resetForm.get('email')!.value
      };
      console.log('Reset password payload:', payload);
      this.auth.userResetPassword(payload).subscribe(
        (data: any) => {
          console.log('Reset password email sent:', data);
          this.isLoading = false;
        },
        error => {
          console.error('Reset password error:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.log('Reset password form is invalid', this.resetForm.value);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}