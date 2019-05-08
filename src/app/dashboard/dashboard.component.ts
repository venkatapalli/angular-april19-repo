import { Component, OnInit } from '@angular/core';
//import APIService
import{ ApiService } from '../api.service';
import { User_details } from '../user_details';
import { Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Routes, Router, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//import APIService
  constructor(private modalService: ModalService,private apiService: ApiService, private router: Router) { }
//define users
user_details:  User_details[];
selectedUser_details:  User_details  = { id :  null , firstname:null, lastname:null, address:null, city:null, state:null, order_total:  null, length: null};

viewdetails:  User_details  = { id :  null , firstname:null, lastname:null, address:null, city:null, state:null, order_total:  null, length: null};
  
public show:boolean = false;
public viewuser:any = 'View';  
ngOnInit() {
    
    this.apiService.readUser_details().subscribe((user_details: User_details[])=>{
    this.user_details = user_details;
    // user_details.forEach(element => {
    //   element.id = element.id;
    //  // return element;
    //   console.log(element.id,element.firstname);
    // });
    // console.log(user_details);
    })
    
  } 
  createOrUpdateUser_details(form){
    if(this.selectedUser_details && this.selectedUser_details.id){
      form.value.id = this.selectedUser_details.id;
      console.log(form.value);
      this.apiService.updateUser_details(form.value).subscribe((user_details: User_details)=>{
        //location.reload(true);
      });
    }
    else{
      this.apiService.createUser_details(form.value).subscribe((user_details: User_details)=>{
        console.log("user details created, ", User_details);
      });
    }
    this.modalService.close('add_user');
  }

  selectUser_details(user_details: User_details,id){
    this.modalService.open(id);
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
      if(!this.show)  
        this.viewuser = "Hide";
      else
      this.modalService.open('view_user');
     this.apiService.viewUser_details(id).subscribe((user_details: User_details)=>{
     
        this.viewdetails = user_details;
        //console.log("User Details , ", user_details);
        this.viewuser = "View";
      //location.reload(true);
    });
   
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
}
