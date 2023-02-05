import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  myShoppingCart: Product[] = [];

  constructor(private storeService: StoreService, private producService: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart()
}

  products: Product []= []
  ngOnInit(): void{
    this.producService.getAllProducts().subscribe(data => {this.products = data})
  }

  today = new Date()
  date2 = new Date(2020, 1, 11)
  montoTotal = 0
  showProductDetail = false
  productSelected : Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product) //aqui en lugar de hacer la logica para añadir el producto estamos usando un servicio que nos añade la lógica necesaria
    this.montoTotal = this.storeService.getShoppingTotal() //de esta forma modularizamos y reutilizamos codigo mucho mejor
  }
  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }
  onShowDetail(id: string){ //aqui recibimos el id del producto que es emitido
    this.producService.getProduct(id).subscribe(data => {this.productSelected = data; this.toggleProductDetail() //y aqui hacemos la solicitud del producto al servicio que se comunica con la api

  }) //en este caso la data solo la mostramos por consola
  }

  createNewProduct()
  {
      const product: CreateProductDTO =
      {
      title: 'Articulo de Prueba',
      price: 1000,
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      description: 'Hola esta es mi prueba ',
      categoryId:2
      }

  this.producService.create(product).subscribe(data=>{console.log('created',data)})
  }

  updateProduct(){
    const changes : UpdateProductDTO = {
      title: 'La Arepa no es Colombiana',
      price: 1000
    }
    const id = this.productSelected.id
    //con esta forma actualizamos en la api y mostramos en consola
    // this.producService.update(id, changes).subscribe(data=>{console.log('actualizacion',data);
    //ahora debemos actualizar el array que tenemos cargado(mostrado) en nuestra web
    this.producService.update(id, changes).subscribe(data=>{const productIndex = this.products.findIndex(item => item.id === this.productSelected.id)
      this.products[productIndex] = data
      this.showProductDetail = false
      })
  }

  deleteProduct(){
    const id = this.productSelected.id
    this.producService.delete(id).subscribe(()=>{const productIndex = this.products.findIndex(item => item.id === id)
        this.products.splice(productIndex, 1)
        this.showProductDetail = false
        console.log('eliminado');

    })
  }

}
