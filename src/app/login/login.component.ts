import { Component, OnInit } from '@angular/core';
import{ ApiService } from '../api.service';
import { Login } from '../user_details';
import { Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService,
               public router: Router) { }

    user_details:  Login[];
    selectedUser_details:  Login  = { username:null, password :  null};

  ngOnInit() {
  } 

 user_login(form){
 console.log(form.value);
      this.apiService.user_detailsLogin(form.value).subscribe(res=>{
      console.log("User Details", res.length);
        if(res.length != 0)
        {
          console.log("User Existed");
          this.router.navigate(['dashboard']);
        }
        else
        {
          console.log("User not Existed");
          location.reload(true);
        }
      });

  }

  login(user_details: Login){
    this.selectedUser_details = user_details;
    console.log("User Details created, ", user_details);
  }

}
