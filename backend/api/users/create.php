<?php
require '../database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

    //print_r($request);
  // Validate.
  if(trim($request->username) === '' ||trim($request->password) === '')//(float)$request->order_total < 0
  {
    return http_response_code(400);
  }
  $createtable = "CREATE TABLE IF NOT EXISTS users_new ( id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
        )  ENGINE=INNODB;";
   if(mysqli_query($con,$createtable))
   {
       // Sanitize.
        $id = mysqli_real_escape_string($con, (int)$request->id);
        $username = mysqli_real_escape_string($con, trim($request->username));
        $password = mysqli_real_escape_string($con, trim($request->password));
        // Create.
        $sql = "INSERT INTO `users_new`(`id`,`username`, `password`) VALUES (null,'{$username}','{$password}')";
       if($id > 0)
        {
            $sql = "UPDATE `users_new` SET `username`='$username',`password`='$password' WHERE `id` = '{$id}' ";
        }
        //print_r($sql);
        if(mysqli_query($con,$sql))
        {
            http_response_code(201);
            $newuser_details = [
            'username' => $username,
            'password' => $password
            ];
            echo json_encode($newuser_details);
        }
        else
        {
            http_response_code(422);
        }
     }
    else{
        http_response_code(422);
    } 
   
    
}