$(document).ready(function() {
	var a = window.sessionStorage.getItem(['user_id']);
	if (a == null) {
		$(location).attr("href", "login.html");
	}
	$.getJSON("data/data_20170106.json", function(data){
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
