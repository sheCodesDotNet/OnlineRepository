import { Injectable } from '@angular/core';

import {Http , Response , Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import'rxjs/add/operator/map';
import'rxjs/add/operator/toPromise';

import {Movie} from './movie-model';
import {Review} from './review-model';
import { Rental} from './rental-model';



@Injectable()

export class MoviesService {
  
  moviesList: Movie[];
 
  reviewList : Review[];
  rentalsList: Rental[]; 
  
  selectMovie: Movie={
    MovieID: null,
    MovieName:'',
    MoviePrice: null,
    MovieRentals:this.rentalsList,
    MovieReviews :this.reviewList,

    
  }
   
  constructor(private http : Http) {
    
   }


  postMovie(emp: Movie){

    var body=JSON.stringify(emp);
    var headerOptions= new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions ({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:62591/api/Movies',body,requestOptions).map(x => x.json());
  }

  putMovie( id ,emp){
    
        var body=JSON.stringify(emp);
        var headerOptions= new Headers({'Content-Type':'application/json'})
        var requestOptions = new RequestOptions ({method : RequestMethod.Put,headers:headerOptions})
        return this.http.post('http://localhost:62591/api/Movies/'+ id,body,requestOptions).map(x => x.json());
        
      }

  getMoviesList(){
    
   this.http.get('http://localhost:62591/api/Movies')
    .map((data : Response) => {
      return data.json() as Movie[]; 
      
    }) .toPromise().then(x => {
      this.moviesList=x  
      console.log(this.moviesList)
   
    })
      
  } 

  deleteMovie (id:number){
    return this.http.delete('http://localhost:62591/api/Movies/' + id).map(res => res.json());

  }

  
}

