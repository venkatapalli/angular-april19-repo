<?php
require 'database.php';

$postdata = file_get_contents("php://input");
// print_r($postdata);exit();
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  if(trim($request->password) === '' || trim($request->username) === '')
  {
    return http_response_code(400);
  }

  // Sanitize.
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));
  $users = [];
  $row = "SELECT * FROM `users` WHERE `username` LIKE '{$username}' and `password` LIKE '{$password}'";

  if($result = mysqli_query($con,$row))
  {
  	while($row = mysqli_fetch_assoc($result))
  {
    $users['id']    = $row['id'];
    $users['firstname'] = $row['firstname'];
    $users['lastname'] = $row['lastname'];
    $users['address'] = $row['address'];
    $users['city'] = $row['city'];
    $users['state'] = $row['state'];
    $users['order_total'] = $row['order_total'];

 }
   echo json_encode($users);
    // http_response_code(200);

  }
  else
  {
    http_response_code(422);
  }
}