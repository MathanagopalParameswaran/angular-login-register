import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormGroup, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthencationService } from '../service/authencation.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy, OnInit {

  formData = { name: "", email: "", password: "" }
  submit = false;
  errorMessage = false;
  loading = false;
  response: any;
  registerSubscription?: Subscription;

  constructor(private auth: AuthencationService, private router: Router) { }


  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    this.loading = true;
    //console.log(this.formData)

    this.registerSubscription = this.auth.registerUser(this.formData.email, this.formData.password, this.formData.name)
      .subscribe({
        next: (data) => {
          this.loading = false;
          if (data) {
            console.log(data);
            this.router.navigate(['/login']);
          }
        },
        error: (reqError: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = reqError.error["errorMessage"];
        }
      });
    //this.loading = false;
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
}
