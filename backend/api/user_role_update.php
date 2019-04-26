<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Validate.
  if ((int)$request->role_id < 1 || trim($request->userrole) == '') {
    return http_response_code(400);
  }
  // Sanitize.
  $role_id    = mysqli_real_escape_string($con, (int)$request->role_id);
  $role_name = mysqli_real_escape_string($con, trim($request->userrole));
  $customer_id = 'Super';
  // Update.
  $sql = "UPDATE `roles` SET `role_name`='$role_name',`customer_id`=(SELECT id FROM users where firstname = '$customer_id') WHERE `role_id` = '{$role_id}' LIMIT 1";
  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}