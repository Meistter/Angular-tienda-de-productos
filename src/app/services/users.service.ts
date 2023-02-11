import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';
import { User, CreateUserDTO } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API = `${environment.API}/api/users`
  constructor(private http: HttpClient) { }

  //en este servicio

  create(dto: CreateUserDTO){

    return this.http.post<User>(this.API, dto) //al crear la api nos retorna un Usuario

  }

  getAll(){
    return this.http.get<User[]>(this.API) //aqui conseguiremos un array de usuarios
  }
}
