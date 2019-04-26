<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$orders = [];
$sql = "SELECT order_id, product_name, order_total, customer_id FROM orders";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $orders[$i]['order_id']    = $row['order_id'];
    $orders[$i]['product_name'] = $row['product_name'];
    $orders[$i]['order_total'] = $row['order_total'];
    $orders[$i]['customer_id']    = $row['customer_id'];
    $i++;
  }

  echo json_encode($orders);
}
else
{
  http_response_code(404);
}