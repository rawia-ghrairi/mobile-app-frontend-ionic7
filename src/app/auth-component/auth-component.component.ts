import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,IonicModule],
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
      password: ['', [Validators.required]]
    });
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
  }

  ngOnInit() {}

  change(screen: 'signin' | 'signup' | 'forget') {
    this.screen = screen;
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const payload = {
        email: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value
      };
      console.log('Login payload:', payload);
      this.auth.userLogin(payload).subscribe(
        (data: any) => {
          console.log('Login success:', data);
          this.isLoading = false;
          this.router.navigate(['/tabs']);
        },
        error => {
          console.error('Login error:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.log('Login form is invalid', this.loginForm.value);
    }
  }
  

  register() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const payload = {
        name: this.signupForm.get('name')!.value,
        email: this.signupForm.get('email')!.value,
        password: this.signupForm.get('password')!.value
      };
      console.log('Signup payload:', payload);
      this.auth.userRegister(payload).subscribe(
        (data: any) => {
          console.log('Register success:', data);
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Register error:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.log('Signup form is invalid', this.signupForm.value);
    }
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
  
}  