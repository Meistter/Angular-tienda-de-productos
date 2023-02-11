import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
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
    private usersService: UsersService,
    ){ }

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
