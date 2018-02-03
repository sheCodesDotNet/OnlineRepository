import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from'@angular/http';
import {Routes, RouterModule } from '@angular/router';

import {BrowserAnimationsModule } from'@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { ReviewsComponent } from './movies/reviews/reviews.component';
import {LoginComponent } from './customers/login/login.component';
import { RentalsComponent } from './rentals/rentals.component';

import { ToastrModule} from 'ngx-toastr';
import { GuardService} from './customers/shared/guard.service';
import { CusromerService} from '../app/customers/shared/cusromer.service';


const appRouts: Routes= [
  {path: 'Login' , component:LoginComponent},
  {path:'customers', canActivate:[GuardService],component:CustomersComponent},
  {path: 'movies',canActivate:[GuardService], component:MoviesComponent},
  {path: 'rentals', component:RentalsComponent},
  {path: '', redirectTo: '/Login', pathMatch:'full'},
  {path: '**', redirectTo: '/Login', pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerListComponent,
    MoviesComponent,
    MovieComponent,
    MovieListComponent,
    ReviewsComponent,
    LoginComponent,
    RentalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRouts),
  ],
  providers: [
    GuardService,
    CusromerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
