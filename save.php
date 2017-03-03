<?php
require("config.php");
// POST値の取得
$ipe = $_POST["ipe"];
$field = $_POST["field"];
$ipe = preg_replace("/\r/", "", $ipe);
$ipe = preg_replace("/^\n/", "", $ipe);
$ipe = preg_replace("/\n/", "\\n", $ipe);
$msg     = "";

//$temp_txt = "./data/data_temp.txt";   // 一時用データファイル

$date = date('Ymd');
$data_txt = "./data/data_".$date.".txt";

if ($ipe) {
	// 禁止文字及び文字数チェック
	if (textbox_check($ipe, "error:".$field, 0, $msg)) {
		exit;
	}
	if ($field) {
		// データファイルがある場合
		if (is_file($data_txt)) {
			// データファイルの権限チェック
			file_check($data_txt, $top_page);
			// データを取得
			$data = file($data_txt);
		}

		// データファイルの1行目より、列数を取得
		$row_max = substr_count($data[0],"\t");

		// 変更した行と列の番号を取得
		$field = ereg_replace("editline","",$field);
		$line = split("_",$field);

		if (($line[0]) && ($line[1])) {
            $fpw = fopen($data_txt, "a+");
            
            fputcsv($fpw, $data);
            fclose($fpw);
//			// tempファイルを開く
//			if (!($fw = fopen($temp_txt, "w"))) {
//				$msg = $temp_txt."ファイルが開けません。<br>";
//				fatal_error($msg, $top_page);
//			}
//			// 行カウントをセット
//			$line_ct = 1;
//			foreach($data as $value) {
//				// 列カウントをセット
//				$row_ct = 1;
//				// データを列で分割
//				$sp_val = split(DELIMIT,$value);
//				// 対象行フラグ
//				$nt_line_flg = 0;
//
//				// 列数分処理を繰り返す
//				foreach($sp_val as $sp_value) {
//					$sp_value = ereg_replace("\r|\n","",$sp_value);
//					// 変更行とデータ行が同じ場合
//					if ($line_ct == $line[0]) {
//						// 列が最大列の場合
//						if ($row_ct == ($row_max+1)) {
//							// 変更列とデータ列が同じ場合は末尾を改行を付加し、データを変更
//							// それ以外のデータはそのまま出力
//							if ($row_ct == $line[1]) {
//								fwrite($fw, $ipe."\n");
//							} else {
//								fwrite($fw, $sp_value."\n");
//							}
//						// 列が最大列ではない場合
//						} else {
//							// 変更列とデータ列が同じ場合は末尾をタブを付加し、データを変更
//							// それ以外のデータはそのまま出力
//							if ($row_ct == $line[1]) {
//								fwrite($fw, $ipe."\t");
//							} else {
//								fwrite($fw, $sp_value."\t");
//							}
//						}
//					// 変更行とデータ行が違う場合
//					} else {
//						// 対象行フラグ
//						$nt_line_flg = 1;
//					}
//					// 列カウントをインクリメント
//					$row_ct++;
//				}
//				// 対象行フラグがセットされた場合
//				if ($nt_line_flg == 1) {
//					// 対象列以外はそのまま出力
//					fwrite($fw, $value);
//				}
//				// 行カウントをインクリメント
//				$line_ct++;
//			}
//			fclose($fw);

			// tempファイルをデータファイルにリネームする
//			rename($temp_txt, $data_txt);
//			chmod($data_txt, PERMIT);
		}
        echo "ここに入力して下さい";
		exit;
	} else {
		echo "保存に失敗しました。";
		exit;
	}
}
?>
