import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
//este servicio se encarga de manipular el token y almacenarlo donde corresponda
export class TokenService {

  removeToken(){
    localStorage.removeItem('token')
  }

  saveToken(token: string){
    localStorage.setItem('token', token) //esto tambien seria posible en cookies
  }

  getToken(){
    const token = localStorage.getItem('token')  //esta funcion la usa el interceptor
    return token
  }

}
