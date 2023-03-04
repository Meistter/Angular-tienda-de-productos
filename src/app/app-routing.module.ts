import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [

  //Esta es una forma de hacerlo, que cuando la ruta este vacia cargue home, o que el home sea la ruta vacia, o que redireccione a home al estar vacia
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {//aqui estamos importando el Modulo de administracion que creamos (cms)
    path: '',
    loadChildren: ()=> import('../app/website/website.module').then(m => m.WebsiteModule)
  },
  {//aqui estamos importando el Modulo de administracion que creamos (cms)
    path: 'admin',
    loadChildren: ()=> import('../app/cms/cms.module').then(m => m.CmsModule)
  },
  {//esta es la ruta para cuando no se encuentra la ruta, error 404, esto tiene que estar de ultimo en esta lista de rutas
    path: '**',
    component: NotFoundComponent
  }
  //!dejamos aqui el componente notfound ya que deberia pertenecer a toda nuestra app y no solo a un componente especifico
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
