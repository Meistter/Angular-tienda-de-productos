import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',

  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  constructor(private route: ActivatedRoute, private productService: ProductsService, private location: Location){}
  productId: string | null = null
  product: Product | null = null //puede ser nulo en caso de no conseguirse

  ngOnInit(): void{
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id')
        if (this.productId){
         return this.productService.getProduct(this.productId)
        }
        return [] //esto es necesario
      })
    ).subscribe(data=>{this.product =data})
  }
  goToBack(){ //esto nos permite ir atrás
    this.location.back()
  }

}
