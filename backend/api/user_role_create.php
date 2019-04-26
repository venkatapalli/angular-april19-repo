<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Validate.
  if(trim($request->userrole) === '')
  {
    return http_response_code(400);
  }
  // Sanitize.
  $role_name = mysqli_real_escape_string($con, trim($request->userrole));
  $firstname = 'Super';
  // Create.
  $sql = "INSERT INTO `roles`(`role_name`, `customer_id`) VALUES ('{$role_name}',(SELECT id FROM users where firstname = '$firstname'))";
    //print($sql);
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user_roles = [
      'role_name' => $role_name,
      'firstname' => $firstname,
      'role_id'    => mysqli_insert_id($con)
    ];
    echo json_encode($user_roles);
  }
  else
  {
    http_response_code(422);
  }
}