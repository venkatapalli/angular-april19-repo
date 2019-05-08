<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$products = [];
$sql = "SELECT * from products";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $products[$i]['id']    = $row['id'];
    $products[$i]['productname'] = $row['productname'];
    $products[$i]['producttype'] = $row['producttype'];
    $i++;
  }

  echo json_encode($products);
}
else
{
  http_response_code(404);
}