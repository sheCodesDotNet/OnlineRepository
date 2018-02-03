import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import {MoviesService } from '../shared/movies.service';
import { ToastrService} from 'ngx-toastr'; 

import { Rental} from '../shared/rental-model';
import { Review} from '../shared/review-model';
import { Movie} from '../shared/movie-model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
 
  constructor(private movieService:MoviesService , private toastr:ToastrService) { }

  ngOnInit() {
    this.recetForm();
  }
  reviewList : Review[];
  rentalsList: Rental[]; 


recetForm(form?:NgForm){

if(form!=null){
form.reset();
this.movieService.selectMovie={
  MovieID: 0,
  MovieName:'',
  MoviePrice: null,
  MovieRentals: this.rentalsList,
  MovieReviews: this.reviewList
    }
  }
}

onSubmit(form: NgForm,movie?:Movie ){
   
 if(this.movieService.selectMovie.MovieID == 0){

this.movieService.postMovie(form.value)
.subscribe(data =>{
this.recetForm(form)
this.movieService.getMoviesList();
this.toastr.success('New Movie is added Successfully!', 'Movie App')
  })
}

// update option
else if(movie.MovieID != 0){
  
  this.movieService.putMovie(this.movieService.selectMovie.MovieID,this.movieService.selectMovie)
  .subscribe(data =>{
  this.recetForm(form)
  this.movieService.selectMovie={
    MovieID: 0,
    MovieName:'',
    MoviePrice: null,
    MovieRentals: this.rentalsList,
    MovieReviews: this.reviewList
  }
  this.movieService.getMoviesList();
  this.toastr.success('Movie is updated Successfully!', 'Movie App');
      });
    }
  }
}

