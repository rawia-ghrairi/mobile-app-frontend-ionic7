import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule],
})
export class ResetPasswordComponent  implements OnInit {

  resetPasswordForm: FormGroup;
  token: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.token = '';
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }
  

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const payload = {
        password: this.resetPasswordForm.get('password')!.value
      };
      this.auth.userUpdatePassword(this.token, payload).subscribe(
        (data: any) => {
          console.log('Password updated successfully:', data);
          this.router.navigate(['/auth']); // Redirect to login page
        },
        error => {
          console.error('Error updating password:', error);
        }
      );
    }
  }
  

}
