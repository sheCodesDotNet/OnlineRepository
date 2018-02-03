import { Component, OnInit } from '@angular/core';

import{ MoviesService } from '../shared/movies.service';
import {Movie } from '../shared/movie-model';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private movieService:MoviesService, private toastr:ToastrService) { }

  ngOnInit() {
 
  this.movieService.getMoviesList();
   
  }

  showForEdit (emp : Movie){

    this.movieService.selectMovie= Object.assign({},emp);
    console.log("MovieID");
    console.log(this.movieService.selectMovie.MovieID)

  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this Movie?')==true){
    this.movieService.deleteMovie(id)
    .subscribe( x => {
      this.movieService.getMoviesList();
      this.toastr.warning("Movie has deleted successfuly!", "Movie App")

    })
  }
  }
}

