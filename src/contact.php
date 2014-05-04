<?php

function send_hello($name, $email, $message) {
  $headers = 'From: ' . $name . '<' . $email . ">\r\n" . 'Reply-To:' . $email;
  if(mail("elmorris232@gmail.com", "[CUSD Website] Message from " . $name, $message, $headers)) {
    return Array('success'=>TRUE);
  } else {
    return Array('success'=>FALSE,'error'=>'Doh! PHP\'s mail() function failed for some reason. Try again later?');
  }
}

if ( isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) ) {
  $resp = send_hello($_POST['name'], $_POST['email'], $_POST['message']);
  header('Content-type: application/json');
  echo(json_encode($resp));
} else {
  header('HTTP/1.0 404 not found');
}

?>