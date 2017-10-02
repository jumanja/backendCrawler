<?php

  $file = fopen("../data-1.json", "r");
  $response = fread($file, filesize("../data-1.json"))
  echo json_encode($response);
  fclose($file);
 ?>
