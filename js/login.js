$(document).ready(function(e) {
	window.sessionStorage.removeItem(['user_id']);

	// 送信ボタンを押した時に作動する処理
	$("#js_login_btn").click(function(){
		 // フォームの値を取得
		var login_id = $("#js_login_id").val();
		var login_pass = $("#js_password").val();

		// 簡単なバリデーション
		if(login_id === ""){
			alert("ユーザーIDに不備があります");
		} else if(login_pass === ""){
			alert("パスワードに不備があります");
		} else {
			$.getJSON("data/user_list.json", function(data){
				var flg = 0;
				for(var i in data){
					if (data[i].user_id === login_id) {
						if (data[i].password === login_pass) {
							window.sessionStorage.setItem(['user_id'],data[i].user_id);
							var a = window.sessionStorage.getItem(['user_id']);
							$(location).attr("href", "chat.html");
						} else {
							alert("パスワードが違います");
						}
						flg = 1;
					}
				}
				if (flg === 0) {
					alert("ユーザーが存在しません");
				}
			});
		}
	});
});
