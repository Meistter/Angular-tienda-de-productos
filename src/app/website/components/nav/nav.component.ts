import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store.service'; //importamos el StoreService para poder recibir la informacion
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  counter = 0
  // email = ''
  profile: User | null = null  //esto lo usamos para recibir el perfil del usuario al hacer login


  constructor(private storeService: StoreService, private authService: AuthService, private categoriesService: CategoriesService){ }

  @Input() email = ''
  categories: Category[] = []

  ngOnInit(): void{
    //aqui nos suscribiremos al servicio store para poder recibir su informacion
    this.storeService.myCart$.subscribe(products=> {
      this.counter = products.length //aqui le sacamos el tamaño al array que estamos recibiendo
    })

    //Conseguimos las categorias para mostrarlas en la nav
    this.getAllCategories()
  }

  showMenu = false

  toggleMenu(){
    this.showMenu = !this.showMenu
  }

  login(){
    // this.authService.login('meistter@gmail.com', '123123')
    // .subscribe(response => {
    //   console.log(response.access_token);
    //   this.token = response.access_token
    //   this.getprofile()
    // })
     //esto vendria a ser un callback hell asi que pasamos la logica del get al servicio y aqui usamos una sola funcion
    this.authService.loginAndGet('meistter@gmail.com', '123123')
    .subscribe(rspUser => {
      this.profile = rspUser

    })

    }

    getAllCategories(){
      this.categoriesService.getAll().subscribe(data=>{this.categories = data})
    }
  // getprofile(){

  //   this.authService.getprofile(this.token)
  //   .subscribe(rsp =>{
  //     console.log(rsp);
  //     this.profile = rsp
  //     console.log('este es el perfil',this.profile);

  //   })
  // }
}
