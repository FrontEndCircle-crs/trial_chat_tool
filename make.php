<?php
// POST値の取得
$user_id = $_POST["user_id"];
$chat_msg = $_POST["chat_msg"];

$date = date('Ymd');
$data_json = "./data/data_".$date.".json";

$link_json = "./data/link.json";

if (!file_exists($data_json)) {
	touch($data_json);

	$json = json_decode(file_get_contents($link_json), true);
	$array_ct = count($json);
	$json[$array_ct]['date'] = $date;
	file_put_contents($link_json, json_encode($json));
}
?>
