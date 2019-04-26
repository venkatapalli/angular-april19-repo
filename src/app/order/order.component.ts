import { Component, OnInit } from '@angular/core';
//import APIService
import{ ApiService } from '../api.service';
import { Order_details } from '../order_details';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

 //import APIService
 constructor(private apiService: ApiService) { }
 //define users
 order_details:  Order_details[];
 selectedOrder_details:  Order_details  = { order_id :  null , product_name:null,  order_total:  null,customer_id :  null,firstname : null };
  ngOnInit() {
    this.apiService.readOrder_details().subscribe((order_details: Order_details[])=>{
      this.order_details = order_details;
      console.log(order_details);
    })
  }
  firstname: string = '';
  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.firstname = event.target.value;
    //console.log(this.firstname);
  }
  createOrUpdateOrder_details(form){
    if(this.selectedOrder_details && this.selectedOrder_details.order_id){
      form.value.id = this.selectedOrder_details.order_id;
      this.apiService.updateOrder_details(form.value).subscribe((order_details: Order_details)=>{
        console.log("Order Details updated" , order_details);
       // location.reload(true);
      });
    }
    else{
      //console.log('hiiiiii');
     // console.log(this.firstname);
     // console.log(this.selectChangeHandler(this.firstname));
      this.apiService.createOrder_details(form.value).subscribe((order_details: Order_details)=>{
        console.log("Order Details created, ", order_details,this.firstname);
        location.reload(true);
      });
    }

  }
  
  selectOrder_details(order_details: Order_details){
    this.selectedOrder_details = order_details;
  }

  deleteOrder_details(order_id){
    this.apiService.deleteOrder_details(order_id).subscribe((order_details: Order_details)=>{
      console.log("Order Details deleted, ", order_details);
      location.reload(true);
    });
  }
  updateOrder_details(order_id){
    console.log(order_id);
    this.apiService.updateOrder_details(order_id).subscribe((order_details: Order_details)=>{
      console.log("Order Details updated, ", order_details);
      //location.reload(true);
    });
  }


}
