import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit = 10
  offset = 10
  products: Product []= []
  productId: string | null = null

  constructor(private productsService: ProductsService, private route: ActivatedRoute){}

  ngOnInit(): void{
    //ESTE ES NUESTRO METODO GETALL pero como añadimos paginacion entonces llamamos al getProductsByPage
    //pero antes usaba getAllProducts().subscribe(data => {this.products = data})
    this.productsService.getProductsByPage(10,0).subscribe(data => {this.products = data})

    //capturamos la ruta, esto lo haremos para que al ver detalles de 1 producto nuestra ruta cambie y sea "shareble"
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product')


    })

  }
  loadMore(){
    this.productsService.getProductsByPage(this.limit,this.offset).subscribe(data => {this.products = this.products.concat(data) //aqui concatenamos los datos para que no se sobreescriban en el array que vemos en el dom si no que carguen debajo
      this.offset += this.limit})
  }
}
