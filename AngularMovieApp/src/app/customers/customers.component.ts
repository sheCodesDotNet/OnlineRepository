import { Component, OnInit } from '@angular/core';

import{ CusromerService } from './shared/cusromer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers:[CusromerService]
})
export class CustomersComponent implements OnInit {

  constructor(private customerService:CusromerService) { }

  ngOnInit() {
  }

}
