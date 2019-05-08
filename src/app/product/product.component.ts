import { Component, OnInit, Inject  } from '@angular/core';
import { ModalService } from '../_services';
import{ ApiService } from '../api.service';
import { User_details } from '../user_details';
import { Product_details } from '../product_details';
import { Routes, Router, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product_details:  Product_details[];
  selectedProduct_details:  Product_details  = { id :  null , productname:null, producttype:null, length: null};
  viewproductdetails:  Product_details  = { id :  null , productname:null, producttype:null, length: null};
  constructor(private modalService: ModalService,private apiService: ApiService, private router: Router) { }
  public show:boolean = false;
public viewproduct:any = 'View'; 
  openModal(id: string) {
    this.modalService.open(id);
  }
  ngOnInit() {
    this.apiService.readProduct_details().subscribe((product_details: Product_details[])=>{
      this.product_details = product_details;
    })
  }
  createOrUpdateProduct_details(form){
    if(this.selectedProduct_details && this.selectedProduct_details.id){
      form.value.id = this.selectedProduct_details.id;
      this.apiService.updateProduct_details(form.value).subscribe((product_details: Product_details)=>{
        location.reload(true);
      });
    }
    else{
      this.apiService.createProduct_details(form.value).subscribe((product_details: Product_details)=>{
        console.log("Product details created, ", Product_details);
        location.reload(true);
      });
    }
  }

  selectProduct_details(product_details: Product_details,id){
    //console.log(user_details['id']);
    this.modalService.open(id);
    this.selectedProduct_details = product_details;
  }

  deleteProduct_details(id){
    this.apiService.deleteProduct_details(id).subscribe((product_details: Product_details)=>{
      console.log("Product Details deleted, ", product_details);
      location.reload(true);
    });
  }
  //view user details
  viewProduct_details(id){
      this.show = !this.show;
      if(!this.show)  
        this.viewproduct = "Hide";
      else
      this.modalService.open('custom-modal-3');
     this.apiService.viewProduct_details(id).subscribe((product_details: Product_details)=>{
        this.viewproductdetails = product_details;
        this.viewproduct = "View";
    });
   
  }

}
