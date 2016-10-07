#!/usr/bin/php
<?php

include('telegram.php');

define('BOT_TOKEN', '285466898:AAF5Q-OlBSIgxMgwqWNJ3KmejE0Zsn9RAXs');
$telegram = new Telegram(BOT_TOKEN);
$risposta = '[{"name": "Snapcaster", "price": 13.4}, {"name": "Snapcaster 2", "price": 2}]';
$mkmprovideradd = 'mkmprice';
$mkmproviderport = '3001';
$provider = 'mkm';

# Perdonami Dio (mr. Backup) per quello che sto per fare.
while (1) {

$req = $telegram->getUpdates();
for ($i = 0; $i < $telegram-> UpdateCount(); $i++) {
	// You NEED to call serveUpdate before accessing the values of message in Telegram Class
	$reply = '';
	$telegram->serveUpdate($i);
	$text = $telegram->Text();
	$chat_id = $telegram->ChatID();
	$benvenuto = "Ciao ".$telegram->FirstName()." ".@$telegram->LastName()."\n";
	$benvenuto .= "Digita \"/price\" seguito dalle carte che stai cercando separandole con una virgola se sono più di una.";

	# Se proprio siete curiosi
	echo "\nMessaggio ricevuto da:".$telegram->FirstName()." (".$telegram->ChatId()."): ".$text."\n";

	switch ($text) {
	case "/start":
		$reply = $benvenuto;
		$content = array('chat_id' => $chat_id, 'text' => $reply);
		$telegram->sendMessage($content);
		break;

	case "/credits":
		$reply = "Script a cura del team di IMPRONTA ADV :\nCheck on GitHub: https://github.com/ImprontaAdvance/telegram-mtg-bot/";
		$content = array('chat_id' => $chat_id, 'text' => $reply);
		$telegram->sendMessage($content);
		break;

	case ( preg_match("/price/",$text) ? true:false ):
			$snap = substr($text,7,strlen($text));
			echo $snap." richieste.\n";
			$risposta = file_get_contents("http://$mkmprovideradd:$mkmproviderport/?q=".$snap."&provider=".$provider);
			$jsonRisposta = json_decode($risposta);
			foreach( $jsonRisposta as $carta){
				$reply .= $carta->name." - ".$carta->price."\n";
			}
			$content = array('chat_id' => $chat_id, 'text' => $reply);
            $telegram->sendMessage($content);
		break;

	}
}
sleep(0.5);
}

?>
