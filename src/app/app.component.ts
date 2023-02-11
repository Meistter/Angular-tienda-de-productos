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
  onLoaded(img: string){ //aqui como sabemos que se transmiten string debo recibir el evento como string
    console.log(`escucha del padre, url de la imagen ${img}`);
  }

  toggleImg(){
    this.showImg = !this.showImg
  }

  constructor(
    private authService: AuthService,
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

  login(){
    this.authService.login('meistter@gmail.com', '123123')
    .subscribe(response => {
      console.log(response.access_token);

    })
  }
  profile(){
    this.authService.profile('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1laXN0dGVyQGdtYWlsLmNvbSIsInN1YiI6OCwiaWF0IjoxNjc2MDc1MTE1LCJleHAiOjE2NzYwNzg3MTV9.Zcy8DwvFSpTOicaJMG-EWGmSlQHgja0joND8nSn5boY')
    .subscribe(rsp =>{
      console.log(rsp);

    })
  }
}
