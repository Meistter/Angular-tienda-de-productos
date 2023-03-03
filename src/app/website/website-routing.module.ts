import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../website/pages/home/home.component';
import { CategoryComponent } from '../website/pages/category/category.component';
import { MycartComponent } from '../website/pages/mycart/mycart.component';
import { LoginComponent } from '../website/pages/login/login.component';
import { RegisterComponent } from '../website/pages/register/register.component';
import { RecoveryComponent } from '../website/pages/recovery/recovery.component';
import { ProfileComponent } from '../website/pages/profile/profile.component';
import { ProductDetailComponent } from '../website/pages/product-detail/product-detail.component';
import { LayoutComponent } from '../website/components/layout/layout.component';

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
      {
        path: 'category/:id',
        component: CategoryComponent
      },
      {
        path: 'notfound',
        component: NotFoundComponent
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
