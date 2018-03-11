<?php 

  $errors = array();
  $data = array();
  // Getting posted data and decodeing json
  $_POST = json_decode(file_get_contents('php://input'), true);

  $nombre = $_POST["nombre"];
  $apellido = $_POST["apellido"];
  $telefono = $_POST["telefono"];
  $correo = $_POST["correo"];
  $comentario = $_POST["comentario"];

  $destino = "jonathan.garrido1988@gmail.com";

  require("phpmailer/class.phpmailer.php");
  $mail = new PHPMailer();
	$mail->Host = "localhost";
	$mail->IsHTML(true);
	$mail->CharSet = 'UTF-8';

	$mail->Subject = "Contacto - Sopraval";
	$mail->From = $correo;
	$mail->FromName = $correo;
	$mail->AddAddress($destino);
	$body = "<p style='font-size:16px;text-transform: uppercase; font-weight: bold'>Consulta</p>";
	$body .= "<p style='font-size:14px;text-transform: capitalize'><span style='display:inline-block; width:100px; font-weight: bold;'>Nombre</span>: ".$nombre."</p>";
	$body .= "<p style='font-size:14px;text-transform: capitalize'><span style='display:inline-block; width:100px; font-weight: bold;'>Apellido</span>: ".$apellido."</p>";
	$body .= "<p style='font-size:14px;text-transform: capitalize'><span style='display:inline-block; width:100px; font-weight: bold;'>Teléfono</span>: ".$telefono."</p>";
	$body .= "<p style='font-size:14px'><span style='display:inline-block; width:100px; font-weight: bold;'>Correo</span>: ".$correo."</p>";
	$body .= "<p style='font-size:14px'><span style='display:inline-block; width:100px; font-weight: bold;'>Comentario</span>: ".$comentario."</p>";
	$mail->Body = $body;

	if($mail->Send()){
		$mail->ClearAddresses();
		echo "bien";
	}else{
		echo "mal";
	}

 ?>