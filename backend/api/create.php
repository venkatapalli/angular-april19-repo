<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->firstname) === '' ||trim($request->lastname) === '' ||trim($request->address) === '' ||trim($request->city) === '' ||trim($request->state) === '' || $request->order_total < 0)//(float)$request->order_total < 0
  {
    return http_response_code(400);
  }

  // Sanitize.
  $firstname = mysqli_real_escape_string($con, trim($request->firstname));
  $lastname = mysqli_real_escape_string($con, trim($request->lastname));
  $address = mysqli_real_escape_string($con, trim($request->address));
  $city = mysqli_real_escape_string($con, trim($request->city));
  $state = mysqli_real_escape_string($con, trim($request->state));
  $order_total = mysqli_real_escape_string($con, $request->order_total);//(int)$request->order_total
  $role_id = 2;

  // Create.
  $sql = "INSERT INTO `users`(`id`,`firstname`, `lastname`, `address`, `city`, `state`,`order_total`,`role_id`) VALUES (null,'{$firstname}','{$lastname}','{$address}','{$city}','{$state}','{$order_total}',2)";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user_details = [
      'firstname' => $firstname,
      'lastname' => $lastname,
      'address' => $address,
      'city' => $city,
      'state' => $state,
      'order_total' => $order_total,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($user_details);
  }
  else
  {
    http_response_code(422);
  }
}