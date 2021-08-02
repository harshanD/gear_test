import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from '../services/auth-guard.service';
import {UserListComponent} from './user-list/user-list.component';
import {UsersResolveService} from "./user-list/users-resolve.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BooksComponent} from './books/books.component';
import {BooksResolverService} from "./books/books-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    resolve: {items: UsersResolveService, books: BooksResolverService}
  },
  {
    path: '/users',
    component: UserListComponent,
    // canActivate: [AuthGuardService],
    // resolve: {items: UsersResolveService}
  }
];

@NgModule({
  declarations: [HomeComponent, UserListComponent, BooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ]
})
export class HomeModule {
}
