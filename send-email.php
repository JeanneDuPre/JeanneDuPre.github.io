<!-- https://www.youtube.com/watch?v=fIYyemqKR58 -->
<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];
# smtp server-> serves emails gmails smtp servers
# condition hinzufügen
# PHPMAILER package

require "vendor/autoload.php";

use PHPMailer/PHPMailer/PHPMailer;
use PHPMailer/PHPMailer/SMTP;

$mail = new PHPMAILER(true);

#Problems to see the problem in that process
// $mail -> SMTPDebug = SMTP::DEBUG_SERVER; 

$mail -> isSMTP();
$mail -> SMTPAuth = true;

$mail -> Host = "smtp.example.com";
$mail -> SMTPSecure = PHPMailer::ENCRYPTON_STARTTLS;
$mail -> Port = 587;

$mail -> Username = "jwiesema@gmail.com";
$mail -> Password = "password";

$mail -> setForm($email, $name);
$mail ->addAddress("dave@example.com", "Dave");

$mail -> Subject = $subject;
$mail -> Body = $message;

$mail -> send();

header("Location: sent.html");
