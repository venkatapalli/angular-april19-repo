import { Component, OnInit } from '@angular/core';
//import APIService
import{ ApiService } from '../api.service';
import { User_details } from '../user_details';
import { Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//import APIService
  constructor(private apiService: ApiService) { }
//define users
user_details:  User_details[];
selectedUser_details:  User_details  = { id :  null , firstname:null, lastname:null, address:null, city:null, state:null, order_total:  null};
  ngOnInit() {
    
    this.apiService.readUser_details().subscribe((user_details: User_details[])=>{
      this.user_details = user_details;
      // user_details.forEach(element => {
       
      //   element.id = element.id;
      //  // return element;
      //   console.log(element.id,element.firstname);
      // });
     
     console.log(user_details);
    })
    
  } 
  createOrUpdateUser_details(form){
    if(this.selectedUser_details && this.selectedUser_details.id){
      form.value.id = this.selectedUser_details.id;
      this.apiService.updateUser_details(form.value).subscribe((user_details: User_details)=>{
        console.log("User Details updated" , user_details);
       // location.reload(true);
      });
    }
    else{

      this.apiService.createUser_details(form.value).subscribe((user_details: User_details)=>{
        //user_details = user_details;
      //  console.log(user_details.id);
      //  console.log(user_details.firstname);
      //  console.log(user_details.order_total);
        console.log("User Details created, ", user_details);
        location.reload(true);
      });
    }

  }

  selectUser_details(user_details: User_details){
    this.selectedUser_details = user_details;
  }

  deleteUser_details(id){
    this.apiService.deleteUser_details(id).subscribe((user_details: User_details)=>{
      console.log("User Details deleted, ", user_details);
      location.reload(true);
    });
  }
  updateUser_details(id){
    console.log(id);
    this.apiService.updateUser_details(id).subscribe((user_details: User_details)=>{
      console.log("User Details updated, ", user_details);
      //location.reload(true);
    });
  }
}
