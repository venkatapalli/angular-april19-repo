<?php

require 'database.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id)
{
  return http_response_code(400);
}
$products = [];
// view.
$sql = "SELECT products.id, products.productname, products.producttype FROM `products` where products.id ={$id} LIMIT 1";
//print_r($sql);
if($result = mysqli_query($con, $sql))
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
  return http_response_code(404);
}