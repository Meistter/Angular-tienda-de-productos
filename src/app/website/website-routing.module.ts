import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../website/pages/home/home.component';

import { MycartComponent } from '../website/pages/mycart/mycart.component';
import { LoginComponent } from '../website/pages/login/login.component';
import { RegisterComponent } from '../website/pages/register/register.component';
import { RecoveryComponent } from '../website/pages/recovery/recovery.component';
import { ProfileComponent } from '../website/pages/profile/profile.component';
import { ProductDetailComponent } from '../website/pages/product-detail/product-detail.component';
import { LayoutComponent } from '../website/components/layout/layout.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '', //estamos haciendo uso del layout
    //estamos usando el layout para tener un router-outlet dentro de otro de forma que el router-oulet padre pueda controlar el modulo privado y el publico, cada uno con sus hijos y paginas hijo
    component: LayoutComponent,
    children: [
      //Los hijos heredan las propiedades de LayoutComponent
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      { //De esta forma Category va a tener un Chunk.js independiente de home y de admin
        path: 'category', //esto lo hacemos asi ya que convertimos a category en un modulo independiente, porque? para separar la logica de category del resto de paginas lo que significa que cuando cargue home por ejemplo no va a cargar el JS de category, esto  aumenta muchisimo el rendimiento de la página web
        loadChildren: ()=> import('./pages/category/category.module').then(m=> m.CategoryModule),
        data:{
          preload: true
        }
      },
      {
        path: 'mycart',
        component: MycartComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'recover',
        component: RecoveryComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard], //Con esto estamos protegiendo con el guardian a la ruta, esto hace que depende de la configuracion del guardian al acceder a esta ruta sin un token el acceso sea denegado
        //Esto es importantisimo y super necesario para validaciones en una página web
        component: ProfileComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
