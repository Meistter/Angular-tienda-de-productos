import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import {tap, map} from 'rxjs/operators'

import { environment } from 'src/environments/enviroment';
interface File{ originalname: string; filename: string; location: string} //esto es un tipado interno rapido y no recomendado para no tener que crear el archivo independientemente
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private API = `${environment.API}/api/files/upload`

  constructor(private http: HttpClient) { }
  // PARA ESTO ES NECESARIO INSTALAR npm i file-saver y para el tipado npm install @types/file-saver --save-dev, tambien importar el saveAs
  getFile(name:string, url: string, type:string){

    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {const blob = new Blob([content], {type}); saveAs(blob, name)}),
      map(() => true)
      )
  }

  uploadFile(file: Blob){
    const dto = new FormData()
    dto.append('file', file) //el nombre es file ya que esta api solo acepta esta denominación
    return this.http.post<File>(this.API, dto
      // ,{headers: {'Content-Type': 'multipart/form-data'}}
      ) //el header aqui es opcional dependiendo del backend, en este caso no era necesario el backend no lo solicita
  }
}

