<?php
  $file = fopen("../data-1.json", "r");
  $response = fread($file, filesize("../data-1.json"));
  //echo json_decode($response);
  echo $response;
  fclose($file);
 ?>
