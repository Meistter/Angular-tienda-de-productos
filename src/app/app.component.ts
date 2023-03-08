import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service'; //servicio para la descarga y subida de archivos
import { TokenService } from './services/token.service';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = 'https://picsum.photos/200';
  widthP = '200'
  showImg = true;
  token = ''
  uploadImage = ''
  // email = ''

    ngOnInit(){
      //!Aqui vamos a hacer la comunicacion con el servidor por unica vez para hacer login de forma que si existe un token de autenticacion logueemos al usuario y nos traigamos su informacion para ponerla en el estado del usuario y manejarla en todos los modulos
      const token = this.tokenService.getToken()
      if(token){  //Si tenemos el token del usuario almacenado en local Storage, entonces vamos y obtenemos el usuario con el getprofile, al hacer esto se guarda en el observable el usuario para mantener su estado en la aplicacion, al hacer esto entonces todos los componentes tienen acceso al usuario y el nav detecta al usuario y muestra sesión iniciada
        this.authService.getprofile()
        .subscribe()
      }
    }
  onLoaded(img: string){ //aqui como sabemos que se transmiten string debo recibir el evento como string
    console.log(`escucha del padre, url de la imagen ${img}`);
  }


  toggleImg(){
    this.showImg = !this.showImg
  }
  // A MODO DE EJEMPLO Y PARA NO CREAR OTRO COMPONENTE USAMOS APP.COMPONENT PARA LA LOGICA, PERO LO CORRECTO ES UN COMPONENTE PARTICULAR
  constructor(
    // private authService: AuthService,
    private usersService: UsersService, private fileService: FilesService, private tokenService: TokenService, private authService: AuthService
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
      password: '123123',
      role: 'customer'
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
