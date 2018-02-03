import { Component, OnInit } from '@angular/core';

import{ CusromerService } from '../shared/cusromer.service';
import {Customer } from '../shared/customer.model';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService:CusromerService, private toastr:ToastrService) { }

  ngOnInit() {
    this.customerService.getCustomersList();
  }

  showForEdit(emp : Customer){

    this.customerService.selectCustomer= Object.assign({},emp);

  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this Customer?')==true){
    this.customerService.deleteCustomer(id)
    .subscribe( x => {
      this.customerService.getCustomersList();
      this.toastr.warning("Customer has deleted successfuly!", "Movie App")

    })
  }
  }
}
