import { Injectable } from '@angular/core';

import {Http , Response , Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import'rxjs/add/operator/map';
import'rxjs/add/operator/toPromise';
import { ToastrService} from 'ngx-toastr'; 
import { Router} from '@angular/router';  
import {Customer} from './customer.model';
import { RentalsComponent} from '../../rentals/rentals.component';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()

export class CusromerService {

  authorize:string;
 
  selectCustomer: Customer={
  CustomerID: 0,
  FirstName:'',
  LastName:'',
  Phone:null,
  Password:'',
  isAdmin:''
  }

 customerIdentity= new BehaviorSubject<Customer>(this.selectCustomer);
 cast = this.customerIdentity.asObservable();

  customersList: Customer[];
  
  constructor(private http : Http , private toastr:ToastrService, private router:Router) { }

  postCustomer(emp: Customer){

    var body=JSON.stringify(emp);
    var headerOptions= new Headers({'Content-Type':'application/json'})
    var requestOptions = new RequestOptions ({method : RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost:62591/api/Customers',body,requestOptions).map(x => x.json());
  }

  putCustomer( id ,emp){
    
        var body=JSON.stringify(emp);
        var headerOptions= new Headers({'Content-Type':'application/json'})
        var requestOptions = new RequestOptions ({method : RequestMethod.Put,headers:headerOptions})
        return this.http.post('http://localhost:62591/api/Customers/'+ id ,body,requestOptions).map(x => x.json());
      }

  getCustomersList() {
    this.http.get('http://localhost:62591/api/Customers')
    .map((data : Response) => {
      return data.json() as Customer[];
    }).toPromise().then(x => {
      this.customersList=x;
      return this.customersList
    })
  }

  deleteCustomer (id:number){
    return this.http.delete('http://localhost:62591/api/Customers/' + id).map(res => res.json());

  }

  editIdentity (newCustomer:Customer){
    this.customerIdentity.next(newCustomer);
  }
  
  
}
