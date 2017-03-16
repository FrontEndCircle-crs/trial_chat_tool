<?php
// POST値の取得
$user_id = $_POST["user_id"];
$chat_msg = $_POST["chat_msg"];

$date = date('Ymd');
$data_json = "./data/data_".$date.".json";

$json = json_decode(file_get_contents($data_json), true);
$array_ct = 0;
$array_ct = count($json);

if ($chat_msg) {
	$json[$array_ct]['user_id'] = $user_id;
	$json[$array_ct]['comment'] = $chat_msg;
	$json[$array_ct]['date'] = date('H:i:s');
	file_put_contents($data_json, json_encode($json));
}
?>
