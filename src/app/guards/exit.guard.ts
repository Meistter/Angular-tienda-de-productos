import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean //!Esta interfaz nos permitira desde el componente register decirle al guardian si debe o no dejar entrar en lugar de hacer aqui la pregunta
}
//?CanDeactive
//Guardian de tipo CanDeactive, este guardian nos permitirá: mantener a un usuario dentro de una pagina especifica de forma que podamos preguntarle
//Si esta seguro de querer salir, esto es usado mas que todo en formularios
@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OnExit, //Esto verifica que el componente que esta usando al guardian haga uso de la interfaz OnExit, esto enlaza por decirlo asi, se verifica el uso mas abajo
    //Esto establece como interfaz de enlace para mandar la informacion la interfaz OnExit
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const rta = confirm('Seguro que desea salir?') //confirm es una funcion nativa de angular que muestra un popup con boton aceptar y cancelar, el cual retorna true o false dependiendo de la seleccion
    //es por esto que aqui retornamos directamente la respuesta del popup
      // return rta;

      //De esta forma la pregunta la haremos en el modulo register y no aqui
      return component.onExit ?  component.onExit() : true; //Aqui retornamos true o false dependiendo de lo que venga del modulo donde aplicamos la lógica
  }

}
