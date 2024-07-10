import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthencationService } from '../../login/service/authencation.service';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavbarComponent]
})
export class HomeComponent implements OnInit {

    constructor(private auth:AuthencationService){}

    ngOnInit(): void {
        //this.auth.canAccess();
    }

}
