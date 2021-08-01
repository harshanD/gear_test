import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import {GuestGuardService} from "../services/guest-guard.service";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    canActivate: [GuestGuardService]
  }
];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SignupModule { }
