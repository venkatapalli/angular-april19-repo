<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$users = [];
$sql = "SELECT id, firstname, lastname, address, city, state,order_total FROM users";

if($result = mysqli_query($con,$sql))
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
    $i++;
  }

  echo json_encode($users);
}
else
{
  http_response_code(404);
}