import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
const routes: Routes = [

  //Esta es una forma de hacerlo, que cuando la ruta este vacia cargue home, o que el home sea la ruta vacia, o que redireccione a home al estar vacia
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {//aqui estamos importando el Modulo de administracion que creamos (cms)
    path: '',
    loadChildren: ()=> import('../app/website/website.module').then(m => m.WebsiteModule),
    data:{
      preload: true
    }
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
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadService})],//aqui con el PreloadAllModules definimos que los modulos se carguen uno detras de otro a medida que este desocupado el explorador de forma que esten listos para cuando el usuario se dirija a ellos pero que no carguen todos a la vez en la entrada inicial a la web, esto es recomendable solo en paginas con pocos modulos
  exports: [RouterModule]                                                          //Sin embargo en este caso en el servicio custom-preload definimos una estrategia de carga donde va a cargar solo los modulos con el preload = true, por eso nuestra estrategia de precarga aqui es un custom-service, el preload = true lo definimos en el app-routing.module principal para home y en el de website para category
})
export class AppRoutingModule { }
