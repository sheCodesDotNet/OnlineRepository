import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Movie} from '../movies/shared/movie-model';
import { Customer} from '../customers/shared/customer.model';

import {CusromerService } from '../customers/shared/cusromer.service';
import { MoviesService} from '../movies/shared/movies.service';
import { ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css'],
  providers:[MoviesService]
})
export class RentalsComponent implements OnInit {

  constructor( private movieService:MoviesService , private cusromerService:CusromerService) { }

  customer:Customer;
  ngOnInit() {
    this.movieService.getMoviesList();
    this.cusromerService.cast.subscribe(customer => this.customer = customer);
    console.log( "in rentals" + this.cusromerService.customerIdentity);
  }
  showForRent (emp : Movie){
    
        this.movieService.selectMovie= Object.assign({},emp);
        console.log("MovieID");
        console.log(this.movieService.selectMovie.MovieID);
        

       
    
      }
}
