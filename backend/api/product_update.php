<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if ((int)$request->id < 1 || trim($request->productname) == '' || trim($request->producttype) == '') {//(float)$request->order_total < 0
    return http_response_code(400);
  }

  // Sanitize.
  $id    = mysqli_real_escape_string($con, (int)$request->id);
  $productname = mysqli_real_escape_string($con, trim($request->productname));
  $producttype = mysqli_real_escape_string($con, trim($request->producttype));
  // Update.
  $sql = "UPDATE `products` SET `productname`='$productname',`producttype`='$producttype' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}