import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../../../website/pages/category/category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule //para poder usar Product y Products components
  ]
})
export class CategoryModule { }
