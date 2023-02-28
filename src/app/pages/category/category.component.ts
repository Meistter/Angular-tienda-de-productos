import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //este componente nos permitira hacer uso de los parametros que ponemos en la url
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  // FALTA HACER LA PAGINACION
  constructor(private route: ActivatedRoute, private productService: ProductsService){}
  products: Product []= []

  categoryId: string | null = null;
  limit = 10;
  offset = 0


  ngOnInit(): void{

    //Aqui estamos usando el switchMap para evitar anidar .subscribes
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id')
        if (this.categoryId){
         return this.productService.getProductsByCategory(this.categoryId,this.limit,this.offset)
        }
        return [] //esto es necesario
      })
    ).subscribe(data=>{this.products =data})

    // .subscribe(params =>{
    //   this.categoryId = params.get('id')
    //   if (this.categoryId){ //validamos que el id no venga nulo // Esta logica siguiente deberia ir en el componente categoria¿?¿? enviamos el id al componente y en el componente consumo e itero a producto
    //     this.productService.getProductsByCategory(this.categoryId,this.limit,this.offset).subscribe(data=>{this.products = data})
    //   }

    // })
  }

  loadMore(){
    if (this.categoryId){
      this.limit ++
      this.offset ++
    this.productService.getProductsByCategory(this.categoryId,this.limit,this.offset).subscribe(data=>{this.products = this.products.concat(data)})
  }
}


}
