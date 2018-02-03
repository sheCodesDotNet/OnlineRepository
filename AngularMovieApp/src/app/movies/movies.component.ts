import { Component, OnInit } from '@angular/core';
import { MoviesService} from './shared/movies.service';

import { Rental} from './shared/rental-model';
import { Review} from './shared/review-model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {
 
  constructor(private movieService:MoviesService) { }

  ngOnInit() {
  }

}
