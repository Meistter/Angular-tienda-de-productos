import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '../website/components/img/img.component';
import { ProductComponent } from '../website/components/product/product.component';
import { ProductsComponent } from '../website/components/products/products.component';
import { NavComponent } from '../website/components/nav/nav.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { ReversePipe } from '../website/pipes/reverse.pipe';
import { TimeAgoPipe } from '../website/pipes/time-ago.pipe';
import { HighlightDirective } from '../website/directives/highlight.directive';
import { HomeComponent } from '../website//pages/home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CategoryComponent } from '../website/pages/category/category.component';
import { MycartComponent } from '../website/pages/mycart/mycart.component';
import { LoginComponent } from '../website/pages/login/login.component';
import { RegisterComponent } from '../website/pages/register/register.component';
import { RecoveryComponent } from '../website/pages/recovery/recovery.component';
import { ProfileComponent } from '../website/pages/profile/profile.component';
import { ProductDetailComponent } from '../website/pages/product-detail/product-detail.component';
import { LayoutComponent } from '../website/components/layout/layout.component';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    HomeComponent,
    NotFoundComponent,
    CategoryComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule

  ]
})
export class WebsiteModule { }
