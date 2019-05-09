import { Component, OnInit } from '@angular/core';
import { Users_new } from '../users_new';
import{ ApiService } from '../api.service';
import { ModalService } from '../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user_new:  Users_new[];
  selectedUser_details:  Users_new  = { id :  0 , username:null, password:null};
  constructor(private modalService: ModalService,private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.newUser_details().subscribe((user_new: Users_new[])=>{
      this.user_new = user_new;
    });
  }
  openModal(id: string) {
    this.selectedUser_details = { id :  0 , username:null, password:null};
    this.modalService.open(id);
  }
  create_newUser(form){
      this.apiService.createUsers_new(form.value).subscribe((user_new: Users_new)=>{
        console.log("user details created, ", Users_new);
        this.apiService.newUser_details().subscribe((user_new: Users_new[])=>{
          this.user_new = user_new;
        });
      });
    this.modalService.close('add_user');
  }
  selectUser_details(user_new: Users_new,id){
    this.modalService.open(id);
    this.selectedUser_details = user_new;
  }
  delete_alert(user_new: Users_new,id){
    this.modalService.open(id);
    this.selectedUser_details = user_new;
  }
  delete_newuser(id){
      this.apiService.delete_newuser(id).subscribe((user_new: Users_new)=>{
        console.log("User Details deleted, ", user_new);
    });
    this.apiService.newUser_details().subscribe((user_new: Users_new[])=>{
      this.user_new = user_new;
    });
    this.modalService.close('delete_user');
  }
  closeModal(id){
    this.modalService.close(id);
  }
}
