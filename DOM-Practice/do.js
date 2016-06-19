
window.onload = function() {
	var notice = document.getElementsByClassName('m-notice')[0];
	var noticeC = notice.getElementsByClassName('content')[0];
	var ctrl = notice.getElementsByClassName('ctrl')[0];
	var a = {
		container: notice,
		eventNode: ctrl,
		contentNode: noticeC,
		getContent: function() {
			return html2node(
'<div class="content">\
        <span>网易云课堂微专业，帮助你掌握专业技能，令你求职或加薪多一份独特优势！ </span>\
        <a href="http://study.163.com/smartSpec/intro.htm#/smartSpecIntro">立即查看 &gt;&gt;</a>\
</div>')
		}
	};
	window.announce = new Notice(a);
	window.a = a;
	console.log(a);
}

