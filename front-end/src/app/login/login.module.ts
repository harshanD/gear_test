import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {Routes, RouterModule} from '@angular/router';
import {GuestGuardService} from '../services/guest-guard.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzAlertModule, NzButtonModule, NzGridModule, NzInputModule} from "ng-zorro-antd";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [GuestGuardService]
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
  ]
})
export class LoginModule {
}
