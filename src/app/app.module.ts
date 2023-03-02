import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './website/components/img/img.component';
import { ProductComponent } from './website/components/product/product.component';
import { ProductsComponent } from './website/components/products/products.component';
import { NavComponent } from './website/components/nav/nav.component';
import { TimeInterceptor } from './interceptors/time.interceptor'; //interceptor
//Este modulo es el que nos permite hacer solicitudes (consumo) a una api
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReversePipe } from './website/pipes/reverse.pipe';
import { TimeAgoPipe } from './website/pipes/time-ago.pipe';
import { HighlightDirective } from './website/directives/highlight.directive';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeComponent } from './website//pages/home/home.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { CategoryComponent } from './website/pages/category/category.component';
import { MycartComponent } from './website/pages/mycart/mycart.component';
import { LoginComponent } from './website/pages/login/login.component';
import { RegisterComponent } from './website/pages/register/register.component';
import { RecoveryComponent } from './website/pages/recovery/recovery.component';
import { ProfileComponent } from './website/pages/profile/profile.component';
import { ProductDetailComponent } from './website/pages/product-detail/product-detail.component';
import { SwiperModule } from 'swiper/angular';
import { LayoutComponent } from './website/components/layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
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

    BrowserModule,
    AppRoutingModule, //modulo para rutas
    FormsModule,
    HttpClientModule,
    SwiperModule

  ],
  //aqui estamos definiendo nuestro interceptor de tiempo para poder ser usado, esto se hace manualmente
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
