$(document).ready(function() {
	var ses_user_id = window.sessionStorage.getItem(['user_id']);
	if (ses_user_id == null) {
		$(location).attr("href", "login.html");
	}
	$.ajax ({
		url: "./make.php",
		type: "post",
		data: {},
		timeout: 10000,
		dataType: "text",
		// ajax失敗
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$(location).attr("href", "login.html");
		}
	});

	var paramArray = [];
	var url  = location.href;
	params   = url.split("?");
	if (params.length >= 2) {
		spparams = params[1].split("&");
		vol = spparams[0].split("=");
		paramArray[vol[0]] = vol[1];
	}
	var dt = new Date();
	var year = dt.getFullYear();
	var month = ("00"+(dt.getMonth()+1)).slice(-2);
	var day = ("00"+dt.getDate()).slice(-2);
	var chk_date = String(year)+String(month)+String(day);

	if ( paramArray["date"] ) {
		if (paramArray["date"] == chk_date) {
			$("#js_chat_area").show();
		}
		var date = paramArray["date"];
	} else {
		$("#js_chat_area").show();
		var date = chk_date;
	}

	var user_icon_arr = [];
	$.ajax({
		url: 'data/user_list.json',
		dataType: 'json',
		async: false,
		success: function(user_list) {
			for(var i in user_list){
				user_icon_arr[user_list[i].user_id] = user_list[i].user_img;
			}
		}
	});

	$.getJSON("data/data_" + date + ".json", function(data){
		html_app = '<table>';
		for(var i in data){
			html_app += '<tr>';
			if (data[i].user_id === ses_user_id) {
//				html_app += '<td><div class="edit">' + data[i].date + '</div></td>';
				html_app += '<td><div class="edit balloon-1-right">' + escapeHtml(data[i].comment) + '</div></td>';
				html_app += '<td><div class="edit"><img src="' + user_icon_arr[data[i].user_id] + '" width="50"></div></td>';
			} else {
				html_app += '<td><div class="edit"><img src="' + user_icon_arr[data[i].user_id] + '" width="50"></div></td>';
				html_app += '<td><div class="edit balloon-1-left">' + escapeHtml(data[i].comment) + '</div></td>';
//				html_app += '<td><div class="edit">' + data[i].date + '</div></td>';
			}
			html_app += '</tr>';
		}
		html_app += '</table>';
		$ ("#inline_editor").append (html_app);
	});

	$.getJSON("data/link.json", function(data){
		html_app = '<table><tr id="link_list">';
		html_app += '<td rowspan="' + Math.ceil(data.length/10) + '"><img src="img/page_menu.jpg" alt="ページメニュー" border="0"></td>';
		var ct = 1;
		for(var i in data){
			html_app += '<td align="left"><a href="./index.html?date=' + data[i].date + '">' + data[i].date + '</a></td>';
			if (ct % 10 == 0) {
				html_app += '</tr><tr id="link_list">';
			}
			ct++;
		}
		html_app += '</tr></table>';
		$ ("#global").append (html_app);
	});

	$("#js_send_btn").click (function () {
		if ($("#js_chat_msg").val() != "") {
			$.ajax ({
				url: "./save.php",
				type: "post",
				data: {
					user_id: ses_user_id,
					chat_msg: $("#js_chat_msg").val()
				},
				timeout: 10000,
				dataType: "text",
				success: function(ret, dataType) {
					$("#js_chat_msg").val("");
					location.reload();
				},
				// ajax失敗
				error: function(XMLHttpRequest, textStatus, errorThrown) {
				}
			});
		}
	});
});

function escapeHtml(str) { 
	str = str.replace(/&/g, '&amp;'); 
	str = str.replace(/</g, '&lt;'); 
	str = str.replace(/>/g, '&gt;'); 
	str = str.replace(/"/g, '&quot;'); 
	str = str.replace(/'/g, '&#39;'); 
	str = str.replace(/\n/g, '<br>'); 
	return str; 
} 
