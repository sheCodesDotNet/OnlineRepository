import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CusromerService } from '../shared/cusromer.service';
import { ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService:CusromerService , private toastr:ToastrService) { }

  ngOnInit() {
    this.recetForm();
  }

recetForm(form?:NgForm){

if(form!=null){
form.reset();
this.customerService.selectCustomer={
  CustomerID: 0,
  FirstName:'',
  LastName:'',
  Phone:null,
  Password:'',
  isAdmin:''
    }
  }
}

onSubmit(form: NgForm){
  form.value.Phone=form.value.Phone.toString()
if(form.value.CustomerID==0){
this.customerService.postCustomer(form.value)
.subscribe(data =>{
this.recetForm(form)
this.customerService.getCustomersList();
this.toastr.success('New Customer is added Successfully!', 'Movie App')
  })
}
// update option
if(form.value.CustomerID!= 0){
  

  this.customerService.putCustomer(form.value.CustomerID, form.value)
  .subscribe(data =>{
  this.recetForm(form)
  this.customerService.getCustomersList();
  this.toastr.success('Customer is updated Successfully!', 'Movie App');
      });
    }
  }
}
