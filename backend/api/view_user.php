<?php

require 'database.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id)
{
  return http_response_code(400);
}
$users = [];
// view.
$sql = "SELECT users.id, users.firstname, users.lastname, users.address, users.city, users.state,users.order_total,roles.role_name  FROM `users` INNER JOIN `roles` ON users.role_id=roles.role_id AND users.id ={$id} LIMIT 1";
//print_r($sql);
if($result = mysqli_query($con, $sql))
{
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $users[$i]['id']    = $row['id'];
      $users[$i]['firstname'] = $row['firstname'];
      $users[$i]['lastname'] = $row['lastname'];
      $users[$i]['address'] = $row['address'];
      $users[$i]['city'] = $row['city'];
      $users[$i]['state'] = $row['state'];
      $users[$i]['order_total'] = $row['order_total'];
      $users[$i]['role_name'] = $row['role_name'];
      $i++;
    }
  
    echo json_encode($users);
}
else
{
  return http_response_code(404);
}