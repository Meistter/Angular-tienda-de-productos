import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User | null = null

  constructor(private authService: AuthService){
  }
  ngOnInit(): void{
    // this.authService.getprofile().subscribe(data=> { this.user = data}) //ya no llamamos al getprofile ya que no es necesario porq estamos manejando el estado del usuario, asi que le solicitamos directamente el usuario a authService ya que el tiene al usuario en el observable
    this.authService.user$.subscribe(data=> { this.user = data})
  }
}
