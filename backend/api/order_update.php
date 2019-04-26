<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if ((int)$request->order_id < 1 || trim($request->product_name) == '' || (float)$request->order_total < 0 ||(int)$request->customer_id < 1) {//(float)$request->order_total < 0
    return http_response_code(400);
  }

  // Sanitize.
  $order_id    = mysqli_real_escape_string($con, (int)$request->order_id);
  $product_name = mysqli_real_escape_string($con, trim($request->product_name));
  $order_total = mysqli_real_escape_string($con, (float)$request->order_total);//(float)$request->order_total
  $customer_id    = mysqli_real_escape_string($con, (int)$request->customer_id);

  // Update.
  $sql = "UPDATE `orders` SET `product_name`='$product_name',`order_total`='$order_total',`customer_id`='$customer_id' WHERE `order_id` = '{$order_id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}