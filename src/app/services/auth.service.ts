import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = `${environment.API}/api/auth`

  constructor(private http: HttpClient, private tokenService: TokenService) { }


  login(email: string, password: string){
    return this.http.post<Auth>(`${this.API}/login`,{
      email: email, password: password    //este es el body
    }).pipe(tap(response => this.tokenService.saveToken(response.access_token))) //response representa el token que regresa cuando hacemos login
  } //este ultimo metodo guarda el token en el localStorage
  logout(){
    this.tokenService.removeToken()
  }
  getprofile(){
    // const headers = new HttpHeaders();
    // headers = headers.set('Autorization', `Bearer ${token}` )    //esta seria la forma dinámica de hacerlo
    return this.http.get<User>(`${this.API}/profile`,{ //aqui no mandamos token porq el interceptor lo busca en el LS y lo agrega
      // headers: {
      //   Authorization: `Bearer ${token}`,  //ya no enviamos el token aqui porq el interceptor se encargara de buscar el token y agregarlo al header


      // }
    })
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password).pipe(switchMap(rta => this.getprofile()))
  }
}
