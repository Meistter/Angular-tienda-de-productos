import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service'; //servicio para la descarga y subida de archivos


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://picsum.photos/200';
  widthP = '200'
  showImg = true;
  token = ''
  uploadImage = ''
  // email = ''

  onLoaded(img: string){ //aqui como sabemos que se transmiten string debo recibir el evento como string
    console.log(`escucha del padre, url de la imagen ${img}`);
  }


  toggleImg(){
    this.showImg = !this.showImg
  }
  // A MODO DE EJEMPLO Y PARA NO CREAR OTRO COMPONENTE USAMOS APP.COMPONENT PARA LA LOGICA, PERO LO CORRECTO ES UN COMPONENTE PARTICULAR
  constructor(
    // private authService: AuthService,
    private usersService: UsersService, private fileService: FilesService
    ){ }


  downloadPdf(){
    this.fileService.getFile('miPdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()

  } //llamamos a la funcion que hace la descarga

  onUpload(event: Event){ //con el evento recibimos desde el html el archivo
    const element = event.target as HTMLInputElement //asi lo almacenamos en una variable
    const file = element.files?.item(0) as Blob //si el element tiene archivos los guardamos en file
    this.fileService.uploadFile(file) //le pasamos el file
    .subscribe(rta=>{
      this.uploadImage = rta.location
    })
  }

  createUser(){
    this.usersService.create({
      name: 'Meistter',
      email: 'meistter@gmail.com',
      password: '123123'
    }).subscribe(response => {
      console.log(response);
    })
  }

      //                            ESTA LOGICA LA TRASLADAMOS A NAV-COMPONENT PARA USAR LOS DATOS OBTENIDOS EN EL NAV
  // login(){
  //   this.authService.login('meistter@gmail.com', '123123')
  //   .subscribe(response => {
  //     console.log(response.access_token);
  //     this.token = response.access_token

  //   })
  // }
  // getprofile(){
  //   this.authService.profile(this.token)
  //   .subscribe(rsp =>{
  //     console.log(rsp);
  //     this.email = rsp.email



  //   })
  // }
}
