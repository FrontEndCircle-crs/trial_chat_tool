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

	var url  = location.href;
	params   = url.split("?");
	spparams = params[1].split("&");

	vol = spparams[0].split("=");
	var paramArray = [];
	paramArray[vol[0]] = vol[1];
	var dt = new Date();
	var year = dt.getFullYear();
	var month = ("00"+(dt.getMonth()+1)).slice(-2);
	var day = ("00"+dt.getDate()).slice(-2);
	var chk_date = String(year)+String(month)+String(day);

	if ( paramArray["date"] != "") {
		if (paramArray["date"] == chk_date) {
			$("#js_chat_area").show();
		}
		var date = paramArray["date"];
	} else {
		$("#js_chat_area").show();
		var date = chk_date;
	}

	$.getJSON("data/data_" + date + ".json", function(data){
		html_app = '<table>';
		for(var i in data){
			html_app += '<tr>';
			html_app += '<td><div class="edit">' + data[i].user_id + '</div></td>';
			html_app += '<td><div class="edit">' + escapeHtml(data[i].comment) + '</div></td>';
			html_app += '<td><div class="edit">' + data[i].date + '</div></td>';
			html_app += '</tr>';
		}
		html_app += '</table>';
		$ ("#inline_editor").append (html_app);
	});

	$.getJSON("data/link.json", function(data){
		html_app = '<td><img src="img/page_menu.jpg" alt="ページメニュー" border="0"></td>';
		for(var i in data){
			html_app += '<td align="left"><a href="./chat.html?date=' + data[i].date + '">' + data[i].date + '</a></td>';
		}
		$ ("#link_list").append (html_app);
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
