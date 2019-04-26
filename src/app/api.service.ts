import { Injectable } from '@angular/core';
//import http client
import { HttpClient } from '@angular/common/http';
//Defining the CRUD Methods
import { User_details } from  './user_details';
//define order details
import { Order_details } from  './order_details';
import { OrderComponent } from './order/order.component';
//define user roles
import { User_roles } from './user_roles';

import { Observable } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //define the PHP_API_SERVER variable in the service
  PHP_API_SERVER = "http://127.0.0.1:9999";//http://localhost/phpmyadmin/sql.php?db=myng7db&table=users&pos=0
  //define http client in provider to get access to service
  constructor(private httpClient: HttpClient) { }
    //add the readUser_details() method that will be used to retrieve the users from the REST API endpoint via a GET request
  readUser_details(): Observable<User_details[]>{
    return this.httpClient.get<User_details[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }
    //add the createUser_details() method that will be used to create a user in the database
  createUser_details(user_details: User_details): Observable<User_details>{
    return this.httpClient.post<User_details>(`${this.PHP_API_SERVER}/api/create.php`, user_details);
  }
    //add the updateUser_details() method to update users:
  // updateUser_details(user_details: User_details){
  //   return this.httpClient.put<User_details>(`${this.PHP_API_SERVER}/api/update.php`, user_details);  
  //   //return this.httpClient.post<User_details>(`${this.PHP_API_SERVER}/api/update.php`, user_details); 
  // }
  updateUser_details(id: number){
    return this.httpClient.get<User_details>(`${this.PHP_API_SERVER}/api/update.php/?id=${id}`);  
  }
    //add the deleteUser_details() to delete policies from the SQL database:
  deleteUser_details(id: number){
    return this.httpClient.delete<User_details>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }

  //read order details from db
  readOrder_details(): Observable<Order_details[]>{
    return this.httpClient.get<Order_details[]>(`${this.PHP_API_SERVER}/api/order_read.php`);
  }
  //insert order into db
  createOrder_details(order_details: Order_details): Observable<Order_details>{
    //console.log(order_details);
    //console.log(OrderComponent);
    return this.httpClient.post<Order_details>(`${this.PHP_API_SERVER}/api/order_create.php`, order_details);
  }
  //delete orders into db
  deleteOrder_details(order_id: number){
    return this.httpClient.delete<Order_details>(`${this.PHP_API_SERVER}/api/order_delete.php/?order_id=${order_id}`);
  }
  //update order details in db
  updateOrder_details(order_id: number){
    return this.httpClient.get<Order_details>(`${this.PHP_API_SERVER}/api/order_update.php/?order_id=${order_id}`);  
  }

  //Register 
   createUser(user_details: User_details): Observable<User_details>{
    return this.httpClient.post<User_details>(`${this.PHP_API_SERVER}/api/register.php`, user_details);
  }
  selectUser(user_details: User_details): Observable<User_details>{
    return this.httpClient.post<User_details>(`${this.PHP_API_SERVER}/api/register.php`, user_details);
  }

  //read user roles from db
  readUser_roles(): Observable<User_roles[]>{
    return this.httpClient.get<User_roles[]>(`${this.PHP_API_SERVER}/api/user_role_read.php`);
  }
  //insert user roles into db
  createUser_roles(user_roles: User_roles): Observable<User_roles>{
    //console.log(user_roles);
    return this.httpClient.post<User_roles>(`${this.PHP_API_SERVER}/api/user_role_create.php`, user_roles);
  }
  //delete user roles into db
  deleteUser_roles(role_id: number){
    //console.log(role_id);
    return this.httpClient.delete<User_roles>(`${this.PHP_API_SERVER}/api/user_role_delete.php/?role_id=${role_id}`);
  }
  //update user roles details in db
  updateUser_roles(role_id: number){
    return this.httpClient.get<User_roles>(`${this.PHP_API_SERVER}/api/user_role_update.php/?role_id=${role_id}`);  
  }

}
