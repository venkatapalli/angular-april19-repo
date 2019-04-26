<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$roles = [];
$sql = "SELECT roles.role_id, roles.role_name, users.firstname, users.lastname FROM roles INNER JOIN users ON roles.customer_id=users.id ";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $roles[$i]['role_id'] = $row['role_id'];
    $roles[$i]['role_name'] = $row['role_name'];
    $roles[$i]['firstname'] = $row['firstname'];
    $roles[$i]['lastname']  = $row['lastname'];
    $i++;
  }

  echo json_encode($roles);
}
else
{
  http_response_code(404);
}