import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../website/components/nav/nav.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from '../website//pages/home/home.component';
import { CategoryComponent } from '../website/pages/category/category.component';
import { MycartComponent } from '../website/pages/mycart/mycart.component';
import { LoginComponent } from '../website/pages/login/login.component';
import { RegisterComponent } from '../website/pages/register/register.component';
import { RecoveryComponent } from '../website/pages/recovery/recovery.component';
import { ProfileComponent } from '../website/pages/profile/profile.component';
import { ProductDetailComponent } from '../website/pages/product-detail/product-detail.component';
import { LayoutComponent } from '../website/components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
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
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule

  ]
})
export class WebsiteModule { }
