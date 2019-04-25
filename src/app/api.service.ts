import { Injectable } from '@angular/core';
//import http client
import { HttpClient } from '@angular/common/http';
//Defining the CRUD Methods
import { User_details } from  './user_details';
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
}
