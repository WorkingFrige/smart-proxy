<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$phone = $_POST['phone'];
$email = $_POST['email'];
$name = $_POST['name'];

//$phone = 1;
//$email = 2;
//$name = 3;

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

$yourEmail = 'order@smart-proxy.ru';
$password = 'dH7jmHpe';

// настройки SMTP
$mail->Mailer = 'smtp';
$mail->Host = 'ssl://smtp.timeweb.ru';
$mail->Port = 465;
$mail->SMTPAuth = true;
$mail->Username = $yourEmail; // ваш email - тот же что и в поле From:
$mail->Password = $password; // ваш пароль;


// формируем письмо

// от кого: это поле должно быть равно вашему email иначе будет ошибка
$mail->setFrom($yourEmail, 'Новая заявка smart-proxy.ru');

// кому - получатель письма
$mail->addAddress('wongrid@yandex.ru');  // кому
$mail->addAddress('smartproxysale@gmail.com');  // кому

$mail->Subject = 'Новая заявка';  // тема письма

$mail->msgHTML("<html><body>
                    <h1>Новая заявка<br></h1>
                    <h4>Имя клиента: $name</h4>
                    <h4>Email: $email</h4>
                    <p>Телефон: $phone</p>
                    </html></body>");


if ($mail->send()) { // отправляем письмо
    echo 'Письмо отправлено!';
} else {
    echo 'Ошибка: ' . $mail->ErrorInfo;
}



