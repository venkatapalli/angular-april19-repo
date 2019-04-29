import { Component, OnInit } from '@angular/core';
//import APIService
import{ ApiService } from '../api.service';
import { User_details } from '../user_details';
import { Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Routes, Router, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
//import {Observable} from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/observable/of';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//import APIService
  constructor(private apiService: ApiService, private router: Router) { }
//define users
user_details:  User_details[];
selectedUser_details:  User_details  = { id :  null , firstname:null, lastname:null, address:null, city:null, state:null, order_total:  null,length: null};
  
public show:boolean = false;
public viewuser:any = 'View';  
ngOnInit() {
    
    this.apiService.readUser_details().subscribe((user_details: User_details[])=>{
      this.user_details = user_details;
      //user details view on id based using switch map -- parammap for route type issue
      /*this.user_details = this.router.paramMap.pipe(
        switchMap(params => {
          const id = +params.get("id")
          return this.apiService.viewUser_details(id) // http request
        })
      )*/
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
  //view user details
  viewUser_details(id){
      this.show = !this.show;
      console.log(id);
      if(!this.show)  
      this.apiService.viewUser_details(id).subscribe((user_details: User_details)=>{
        this.selectedUser_details = user_details;
        console.log("User Details , ", user_details);
        this.viewuser = "View";
      //location.reload(true);
    });
    //this.router.navigate(['dashboard', id]);
      else
      this.viewuser = "Hide";
  }
  updateUser_details(id){
    console.log(id);
    this.apiService.updateUser_details(id).subscribe((user_details: User_details)=>{
      console.log("User Details updated, ", user_details);
      //location.reload(true);
    });
  }
}
