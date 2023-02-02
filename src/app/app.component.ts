import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://picsum.photos/200';
  widthP = '200'
  showImg = true;
  onLoaded(img: string){ //aqui como sabemos que se transmiten string debo recibir el evento como string
    console.log(`escucha del padre, url de la imagen ${img}`);
  }

  toggleImg(){
    this.showImg = !this.showImg
  }
}
