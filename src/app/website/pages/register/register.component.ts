import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  onExit(){
    const rta = confirm('Logica desde register, estas seguro de salir?')
    return rta
  }
}
