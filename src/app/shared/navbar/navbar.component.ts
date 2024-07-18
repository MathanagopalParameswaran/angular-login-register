import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthencationService } from '../../login/service/authencation.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authencationService: AuthencationService) { }

  logout(){
    this.authencationService.removeToken();
    this.authencationService.canAccess();
  }
}
