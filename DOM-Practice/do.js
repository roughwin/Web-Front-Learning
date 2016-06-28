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


	var lll = new LoginForm();
	lll.on('login', function(){
			// login成功 callback
			var username = this.form.getElementsByClassName('username')[0].getElementsByTagName('input')[0].value;
			var password = this.form.getElementsByClassName('password')[0].getElementsByTagName('input')[0].value;
			var onSucess = function (response) {
				if(response=='1'){
					setCookie('loginSuc','1');
					this.hide();
					attention(function () {
						// 改变logo状态
						document.getElementsByClassName('z-unfollow')[0].style.display = 'none';
						document.getElementsByClassName('z-followed')[0].style.display = 'block';
					});
					
				}else{
					alert('登陆验证失败');
				}	
			};
			login(username,password,onSucess.bind(this));

		});
	window.lll = lll;
	var co = document.getElementsByClassName('u-follow')[0];
	co.addEventListener('click', function () {
		
		lll.show();
		
		
	});

	//banner
	var banner = new Banner({
		container: document.getElementsByClassName('m-banner')[0],
		list : [
			{src:'./img/banner1.jpg',href:'http://open.163.com/'},
			{src:'./img/banner2.jpg',href:'http://study.163.com/'},
			{src:'./img/banner3.jpg',href:'http://www.icourse163.org/'},
			{src:'./img/banner1.jpg',href:'http://open.163.com/'},
			{src:'./img/banner2.jpg',href:'http://study.163.com/'},
			
		],
		time : 5000,

	});
	window.banner = banner;
	banner.show(0);
	banner.loop();

	
	function callback(response) {
		var abc = JSON.parse(response);
		debugger;
		console.log(abc);
	};
	var xyt = function () {
		httpGET('http://study.163.com/webDev/couresByCategory.htm',callback,{pageNo:1,psize:20,type:'20'});
	}
	window.xyt = xyt;
	//httpGET('http://study.163.com/webDev/hotcouresByCategory.htm',callback);

}

