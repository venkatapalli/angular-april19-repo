<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if ((int)$request->id < 1 || trim($request->firstname) == '' || trim($request->lastname) == '' || trim($request->address) == '' || trim($request->city) == '' || trim($request->state) == '' || (float)$request->order_total < 0) {//(float)$request->order_total < 0
    return http_response_code(400);
  }

  // Sanitize.
  $id    = mysqli_real_escape_string($con, (int)$request->id);
  $firstname = mysqli_real_escape_string($con, trim($request->firstname));
  $lastname = mysqli_real_escape_string($con, trim($request->lastname));
  $address = mysqli_real_escape_string($con, trim($request->address));
  $city = mysqli_real_escape_string($con, trim($request->city));
  $state = mysqli_real_escape_string($con, trim($request->state));
  $order_total = mysqli_real_escape_string($con, (float)$request->order_total);//(float)$request->order_total

  // Update.
  $sql = "UPDATE `users` SET `firstname`='$firstname',`lastname`='$lastname',`address`='$address',`city`='$city',`state`='$state',`order_total`='$order_total' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}