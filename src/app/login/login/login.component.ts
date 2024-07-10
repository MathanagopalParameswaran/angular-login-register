import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthencationService } from '../service/authencation.service';
import { subscribe } from 'diagnostics_channel';
import { Subscription } from 'rxjs';
import { error } from 'console';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  lForm = { username: "", password: "" }
  submit = false;
  errorMessage = "";
  loading = false;
  httpResponse: any;

  constructor(private auth: AuthencationService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    this.loading = true;
    this.auth.loginUser(this.lForm.username, this.lForm.password).subscribe({
      next: data => {
        console.log(data);
        this.auth.storeToken(data.token);
        this.auth.canAuthenticate();
      },
      error: (reqError: HttpErrorResponse) => {
        this.errorMessage = reqError.error["errorMessage"];
        console.log(reqError.error);
      }

    }).add(() => {
      this.loading = false
    })
  }

}
