import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // Es requerido mostrar el currentUser (public)

  // Se utiliza una señal computada para exponer los datos
  // sin que puedan ser modificados
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {}

  login(email: string, password: string): Observable<Boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }; // { email: email, password: password}

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user),
          this._authStatus.set(AuthStatus.authenticated),
          localStorage.setItem('token', token);
        console.log(user, token);
      }),
      map(() => true)
    );
  }
}
