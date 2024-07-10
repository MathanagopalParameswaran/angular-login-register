import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "dashboard", component: DashboardComponent }
];
