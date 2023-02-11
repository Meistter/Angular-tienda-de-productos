import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store.service'; //importamos el StoreService para poder recibir la informacion
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  counter = 0
  // email = ''
  token = ''
  profile: User = { //esto lo usamos para recibir el perfil del usuario al hacer login
    id: '',
    email: '',
    password: '',
    name: ''
  }

  constructor(private storeService: StoreService, private authService: AuthService){ }

  @Input() email = ''

  ngOnInit(): void{
    //aqui nos suscribiremos al servicio store para poder recibir su informacion
    this.storeService.myCart$.subscribe(products=> {
      this.counter = products.length //aqui le sacamos el tamaño al array que estamos recibiendo
    })
  }

  showMenu = false

  toggleMenu(){
    this.showMenu = !this.showMenu
  }

  login(){
    this.authService.login('meistter@gmail.com', '123123')
    .subscribe(response => {
      console.log(response.access_token);
      this.token = response.access_token
      this.getprofile()
    })
     //esto vendria a ser un callback hell
  }
  getprofile(){

    this.authService.profile(this.token)
    .subscribe(rsp =>{
      console.log(rsp);
      this.profile = rsp
      console.log('este es el perfil',this.profile);

    })
  }
}
