import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.API_URL;
  constructor(private http:HttpClient,private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  
  
  userLogin(credentials: { email: string, password: string, role: string }) {
    return this.http.post<{
      status: string,
      access_token: string,
      user: { email: string, role: string, _id?: string }
    }>(`${this.API_URL}login`, credentials).pipe(
      tap((res) => {
        if (res.status === 'success' && res.access_token) {
          this.setSession(res);
          this.redirectAfterLogin(res.user);
        }
      })
    );
  }
  setSession(authResult: {
    access_token: string,
    user: { email: string, role: string }
  }) {
    localStorage.setItem('auth_token', authResult.access_token);
    localStorage.setItem('email', authResult.user.email);
    localStorage.setItem('role', authResult.user.role);
  }
  redirectAfterLogin(user: { role: string, _id?: string }) {
    const redirectUrl = localStorage.getItem('redirect_url') || 
                       (user.role === 'patient' ? '/tabs/members' : 
                       `/doctor-home-page/${user._id}`);
    
    localStorage.removeItem('redirect_url');
    this.router.navigateByUrl(redirectUrl);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('redirect_url');
    this.router.navigate(['/auth']);
  }

  userRegister(req: any){
    return this.http.post(`${this.API_URL}register`,req);
  }

  userResetPassword(payload: any) {
    return this.http.post(`${this.API_URL}reset-password`, payload);
  }

  userUpdatePassword(token: string, payload: any) {
    return this.http.post(`${this.API_URL}reset-password/${token}`, payload);
  }
  
  
  
}
