import { Component, OnInit } from '@angular/core';
import { AuthencationService } from '../../login/service/authencation.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  token: any;
  username = "";
  constructor(private auth: AuthencationService) { }

  ngOnInit(): void {
    this.auth.canAccess();
    this.auth.getUserDetails().subscribe(data => {
      this.username = data.userName;
    });
  }

}
