import { Component, OnInit } from '@angular/core';
//import APIService
import{ ApiService } from '../api.service';
import { User_roles } from '../user_roles';
import { Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
//import APIService
constructor(private apiService: ApiService) { }
//define users roles
user_roles:  User_roles[];
selectedUser_roles:  User_roles  = { role_id :  null , role_name:null, customer_id:null};
  ngOnInit() {
    this.apiService.readUser_roles().subscribe((user_roles: User_roles[])=>{
      this.user_roles = user_roles;
      console.log(user_roles);
    })
  }
  createOrUpdateUser_roles(form){
    if(this.selectedUser_roles && this.selectedUser_roles.role_id){
      form.value.id = this.selectedUser_roles.role_id;
      this.apiService.updateUser_roles(form.value).subscribe((user_roles: User_roles)=>{
        console.log("User Roles updated" , user_roles);
       // location.reload(true);
      });
    }
    else{

      this.apiService.createUser_roles(form.value).subscribe((user_roles: User_roles)=>{
        console.log("User Roles created, ", user_roles);
        location.reload(true);
      });
    }
  }
    selectUser_roles(user_roles: User_roles){
      this.selectedUser_roles = user_roles;
    }
  
    deleteUser_roles(role_id){
      //console.log(role_id);
      this.apiService.deleteUser_roles(role_id).subscribe((user_roles: User_roles)=>{
        console.log("User Roles deleted, ", user_roles);
        location.reload(true);
      });
    }
    updateUser_roles(role_id){
      console.log(role_id);
      this.apiService.updateUser_roles(role_id).subscribe((user_roles: User_roles)=>{
        console.log("User Roles updated, ", user_roles);
        //location.reload(true);
      });
    }

}
