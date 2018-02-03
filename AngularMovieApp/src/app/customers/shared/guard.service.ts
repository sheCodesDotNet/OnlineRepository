import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { CusromerService} from './cusromer.service';
import { ToastrService} from 'ngx-toastr'; 
import { Router} from '@angular/router';  

@Injectable()
export class GuardService implements CanActivate {

  constructor(private cusromerService:CusromerService, private toastr:ToastrService, private router:Router) { }
  authorize:string="";
  
  canActivate(){
    
    if((this.authorize=="admin")||(this.authorize=="authorize")){
    return true;
    }
    else {this.router.navigate(['Login'])}
  
    
  }

  loginCheck(str:string, userName?:string):void{
    
    
            switch(str){
              case "admin": {
                this.authorize="admin"
                this.toastr.success('Wellcome Admin!', 'Movie App')
                this.router.navigate(['movies'])
                break;
                
              }
              case "authorize": {
                this.authorize="authorize"
                this.toastr.success('Wellcome ' + userName , 'Movie App')
                this.router.navigate(['rentals'])
                break;
                
              }
              case "unAuthorize": {
                this.toastr.warning("UserName or Password is incorrect!", "Movie App")
                break;
              
            }
            default:{
              break;
            }   
          }
          
        }
         
     }
    

