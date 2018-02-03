
import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Customer} from'../shared/customer.model';


import { CusromerService } from '../shared/cusromer.service';
import { GuardService} from '../shared/guard.service';
import { ToastrService} from 'ngx-toastr';
import { Router} from '@angular/router';  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[CusromerService]
})
export class LoginComponent implements OnInit {

  constructor(private customerService:CusromerService ,private toastr:ToastrService, private router:Router, private guard:GuardService) { }
  

  ngOnInit() {
    this.recetForm();
    this.customerService.getCustomersList();
    this.customerService.cast.subscribe(customer => this.customer = customer)
  
  }

userNamer:string="";
customer:Customer;

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
onSubmit(form: NgForm): void{
  for(let i=0; i<this.customerService.customersList.length;i++){
    this.userNamer=this.customerService.customersList[i].FirstName+" "+ this.customerService.customersList[i].LastName;
    if(((form.value.UserName==this.userNamer)&&(form.value.Password==this.customerService.customersList[i].Password)&&(this.customerService.customersList[i].isAdmin=="yes"))){
      this.customerService.authorize="admin";
      this.guard.loginCheck(this.customerService.authorize,this.userNamer)
      this.recetForm(form);
      return;
    }
    if(((form.value.UserName==this.userNamer)&&(form.value.Password==this.customerService.customersList[i].Password)&&(this.customerService.customersList[i].isAdmin!="yes"))){
      this.customerService.authorize="authorize";
      this.guard.loginCheck(this.customerService.authorize,this.userNamer)
      this.customerService.editIdentity(this.customerService.customersList[i]);
      console.log(this.customerService.customerIdentity)
      this.recetForm(form); 
      return;
    }
  }
  this.customerService.authorize="unAuthorize";
  this.guard.loginCheck(this.customerService.authorize,this.userNamer)
  this.router.navigate(['Login'])
  this.recetForm(form);  
  return; 
}


}


