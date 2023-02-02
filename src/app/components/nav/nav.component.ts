import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service'; //importamos el StoreService para poder recibir la informacion
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  counter = 0
  constructor(private storeService: StoreService){ }

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
}
