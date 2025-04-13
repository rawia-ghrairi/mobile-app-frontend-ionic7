import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.API_URL;
  constructor(private http:HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('email');
  }
  
  userLogin(req: any){
    return this.http.post(`${this.API_URL}login`,req).pipe(
      tap((res: any) => {
        if (res.status === 'success') {
          // Stocker un "token" ou identifiant (par exemple, email ou un flag)
          localStorage.setItem('email', res.email);
          localStorage.setItem('role', req.role); // si tu veux différencier docteur/patient
        }
      })
    );;
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
