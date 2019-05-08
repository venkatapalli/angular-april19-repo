<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->productname) === '' ||trim($request->producttype) === '')//(float)$request->order_total < 0
  {
    return http_response_code(400);
  }

  // Sanitize.
  $productname = mysqli_real_escape_string($con, trim($request->productname));
  $producttype = mysqli_real_escape_string($con, trim($request->producttype));
  // Create.
  $sql = "INSERT INTO `products`(`id`,`productname`, `producttype`) VALUES (null,'{$productname}','{$producttype}')";
  
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $product_details = [
      'productname' => $productname,
      'producttype' => $producttype
    ];
    //print_r($product_details);
    echo json_encode($product_details);
  }
  else
  {
    http_response_code(422);
  }
}