import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = `${environment.API}/api/auth`
  private user = new BehaviorSubject<User | null>(null) //inicia en null
//Esto lo usamos para manejar el estado del usuario (logueado o deslogueado) en toda mi aplicacion, desde aqui le enviaremos a todos los componentes la informacion requerida

  user$ = this.user.asObservable() //este observador es el que nos permitira comunicar la informacion a otros modulos


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
    return this.http.get<User>(`${this.API}/profile`)
    .pipe(
      tap(user => this.user.next(user))   //!aqui nutrimos el observable con el estado del usuario cada vez que se haga getProfile
    )

                                                        //aqui no mandamos token porq el interceptor lo busca en el LS y lo agrega
      // headers: {
      //   Authorization: `Bearer ${token}`,  //ya no enviamos el token aqui porq el interceptor se encargara de buscar el token y agregarlo al header


  //     }
   // })
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password).pipe(switchMap(rta => this.getprofile()))
  }
}
