import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import  Swal  from 'sweetalert2'
import { zip } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{
  myShoppingCart: Product[] = [];

  constructor(private storeService: StoreService, private producService: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart()
}

  @Input() products: Product []= []

  limit = 10
  offset = 10 //empiezo con el offset en 10 porq la primera llamada (en el ngOnInit) empieza con el offset en cero, entonces se duplicarian los datos
  statusDetail : 'loading' | 'success' | 'error' | 'init' = 'init'
  //esto lo usamos para el control del error

  @Output() atLoadMore: EventEmitter<string> = new EventEmitter<string>();
  // lo movimos al home
  // ngOnInit(): void{
  //   //ESTE ES NUESTRO METODO GETALL pero como añadimos paginacion entonces llamamos al getProductsByPage
  //   //pero antes usaba getAllProducts().subscribe(data => {this.products = data})
  //   this.producService.getProductsByPage(10,0).subscribe(data => {this.products = data})


  // }
  //con este metodo cargamos mas datos en el array del dom (paginamos)
  loadMore(){
    this.atLoadMore.emit()
    // this.producService.getProductsByPage(this.limit,this.offset).subscribe(data => {this.products = this.products.concat(data) //aqui concatenamos los datos para que no se sobreescriban en el array que vemos en el dom si no que carguen debajo
    //   this.offset += this.limit})
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
    this.statusDetail = 'loading' //al iniciar la funcion asignamos loading al statusDetail
   // this.toggleProductDetail() //lo llamamos aqui para que cuando este cargando igual abra la ventana

    this.producService.getProduct(id).subscribe(data => {this.productSelected = data; this.toggleProductDetail(); this.statusDetail = 'success' //y aqui hacemos la solicitud del producto al servicio que se comunica con la api
    //en caso de exito estamos mostrando el statusDetail Success
    }, response => {
    // console.log(response.error.message)
    this.statusDetail = 'error' //en caso de error mostramos el statusDetail correspondiente

    //aqui mostraremos usando sweetalert el mensaje de error
    Swal.fire({
      title: response,
      text: response,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  })
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

  //esto es recomendable hacerlo en el servicio
//esto es un ejemplo de solucion a un callback hell
  readAndUpdate(id: string){ //en esta funcion vemos un ejemplo de como evitar el callback hell
    this.producService.getProduct(id)
    .pipe(
      switchMap((product) => this.producService.update(product.id, {title: 'change'})),
      switchMap((product) => this.producService.update(product.id, {title: 'change'})), //estas serian las otras peticiones que haria en lugar del callback hell
      switchMap((product) => this.producService.update(product.id, {title: 'change'})),

      )
      .subscribe(data => {
        console.log(data); //y aqui manipularia la data final por la cual hice un callback hell
      })
      //este es un ejemplo cuando queremos enviar dos promesas al mismo tiempo sin hacer un callback Hell
      zip(
        this.producService.getProduct(id),
        this.producService.update(id, {title: 'nuevo'})
      ).subscribe(response => {
        const read = response [0] //representa la respuesta del getProduct
        const update = response [1] //representa la respuesta del update
      })
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
