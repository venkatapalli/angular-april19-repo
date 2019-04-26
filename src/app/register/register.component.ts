import { Component, OnInit } from '@angular/core';
import{ ApiService } from '../api.service';
import { Register } from '../user_details';
import { Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  	user_details:  Register[];
	selectedUser_details:  Register  = { id :  null , firstname:null, lastname:null, address:null, city:null, state:null, username: null, password: null};

  ngOnInit() {

  } 
  createOrUpdateUser_details(form){
      this.apiService.createUser(form.value).subscribe(res=>{
        //console.log("User Details created, ", user_details);
        location.reload(true);
      });
  }
  selectUser(user_details: Register){
    this.selectedUser_details = user_details;
  }

}


