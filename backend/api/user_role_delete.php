<?php
require 'database.php';
// Extract, validate and sanitize the order_id.
$role_id = ($_GET['role_id'] !== null && (int)$_GET['role_id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['role_id']) : false;
if(!$role_id)
{
  return http_response_code(400);
}
// Delete.
$sql = "DELETE FROM `roles` WHERE `role_id` ='{$role_id}' LIMIT 1";
if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}