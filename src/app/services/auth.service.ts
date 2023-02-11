import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = `${environment.API}/api/auth`
  constructor(private http: HttpClient) { }


  login(email: string, password: string){
    return this.http.post<Auth>(`${this.API}/login`,{
      email: email, password: password    //este es el body
    })
  }
  profile(token: string){
    return this.http.get<User>(`${this.API}/profile`) //aqui falta enviarle el token a la api
  }
}
