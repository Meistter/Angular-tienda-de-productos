import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeInterceptor } from './interceptors/time.interceptor'; //interceptor
//Este modulo es el que nos permite hacer solicitudes (consumo) a una api
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SwiperModule } from 'swiper/angular';
import { NotFoundComponent } from './not-found/not-found.component';


//Todas las importaciones de aqui las pasamos al routing del website ya que hicimos 2 aplicaciones independientes dentro de esta app
// de esta forma vamos a poder hacer el cms(admin) y el website de formas independientes como si trabajaramos en apps independientes, suuuper bien
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
    //!dejamos aqui el componente notfound ya que deberia pertenecer a toda nuestra app y no solo a un componente especifico

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
