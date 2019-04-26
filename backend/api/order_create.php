<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->product_name) === '' || $request->order_total < 0||(int)$request->customer_id < 1)//(float)$request->order_total < 0
  {
    return http_response_code(400);
  }

  // Sanitize.
  $product_name = mysqli_real_escape_string($con, trim($request->product_name));
  $order_total = mysqli_real_escape_string($con, $request->order_total);//(int)$request->order_total
  $customer_id    = mysqli_real_escape_string($con, (int)$request->customer_id);

  // Create.
  $sql = "INSERT INTO `orders`(`product_name`, `order_total`,`customer_id`) VALUES ('{$product_name}','{$order_total}','{$customer_id}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $order_details = [
      'product_name' => $product_name,
      'order_total' => $order_total,
      'customer_id' => $customer_id,
      'order_id'    => mysqli_insert_id($con)
    ];
    echo json_encode($order_details);
  }
  else
  {
    http_response_code(422);
  }
}