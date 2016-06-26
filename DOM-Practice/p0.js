var emitter = {
  // 注册事件
  on: function(event, fn) {
    var handles = this._handles || (this._handles = {}),
      calls = handles[event] || (handles[event] = []);

    // 找到对应名字的栈
    calls.push(fn);

    return this;
  },
  // 解绑事件
  off: function(event, fn) {
    if(!event || !this._handles) this._handles = {};
    if(!this._handles) return;

    var handles = this._handles , calls;

    if (calls = handles[event]) {
      if (!fn) {
        handles[event] = [];
        return this;
      }
      // 找到栈内对应listener 并移除
      for (var i = 0, len = calls.length; i < len; i++) {
        if (fn === calls[i]) {
          calls.splice(i, 1);
          return this;
        }
      }
    }
    return this;
  },
  // 触发事件
  emit: function(event){
    var args = [].slice.call(arguments, 1),
      handles = this._handles, calls;

    if (!handles || !(calls = handles[event])) return this;
    // 触发所有对应名字的listeners
    for (var i = 0, len = calls.length; i < len; i++) {
      calls[i].apply(this, args)
    }
    return this;
  }
}
function html2node (str) {
	 var container = document.createElement('div');
	 container.innerHTML = str;
	 return container.children[0]; 
}
function extend(o1,o2) {
	for(var i in o2) if(typeof o1[i] === 'undefined'){
		o1[i] = o2[i];
	}
	return o1;
}
function getcookie() {
	var cookie = {};
	var all = document.cookie;
	if (all === '') return cookie;
	var list = all.split('; ');
	for (var i = 0, len = list.length; i < len; i++) {
		var item = list[i];
		var p = item.indexOf('=');
		var name = item.substring(0, p);
		name = decodeURIComponent(name);
		var value = item.substring(p + 1);
		value = decodeURIComponent(value);
		cookie[name] = value;
	}
	return cookie;
}
function setCookie(name, value, expires, path, domain, secure) {
	var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires)
		cookie += '; expires=' + expires.toGMTString();
	if (path)
		cookie += '; path=' + path;
	if (domain)
		cookie += '; domain=' + domain;
	if (secure)
		cookie += '; secure=' + secure;
	document.cookie = cookie;
}
function removeCookie(name, path, domain) {
	var cookie = '';	
	cookie += encodeURIComponent(name) + '=' + encodeURIComponent('0');
	if(path)
		cookie += '; path=' + path;
	if(domain)
		cookie += '; domail=' + domain;
	cookie += '; max-age=0';
	document.cookie = cookie;
}
function httpGET(url,onSucess,args) {
	var xhr = new XMLHttpRequest();
	if(args){
		var url = url + '?';
		for(var i in args){
			url = url + i + '=' + args[i] + '&';
		}
		url = url.replace(/&$/,'');
	}
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	onSucess(this.responseText);       
        }
    }
    xhr.open('get', url, true);
    xhr.send();
}
function httpPOST(argument) {
	// body...
}
function login(uname, pwd,onSucess) {	
	httpGET('http://study.163.com/webDev/login.htm',onSucess,{userName:hex_md5(uname),password:hex_md5(pwd)});	
}
function attention(onSucess) {
	httpGET('http://study.163.com/webDev/attention.htm',onSucess);
}
var template = 
'<div class="login-layer">\
	    <form action="http://study.163.com/webDev/login.htm" method="get" class="m-loginform">\
	        <label class="title">登录网易云课堂</label>\
	        <span class="close"></span>\
	        <div class="username">\
	            <input type="text" placeholder="账号">\
	        </div>\
	        <div class="password">\
	            <input type="password" placeholder="密码">\
	        </div>     \
	        <input type="button" class="submit" value="">\
	    </form>\
	    <div class="zoom"></div>\
	</div>'
function LoginForm(opt) {
	var options = opt || {};
	var self = this;
	
	this._layout = template;
	this.container = html2node(this._layout);
	this.mask = this.container.getElementsByClassName('zoom')[0];
	this.form = this.container.getElementsByClassName('m-loginform')[0];
	this.close = this.container.getElementsByClassName('close')[0];
	this.login = this.container.getElementsByClassName('submit')[0];
	extend(this,options);

	this.close.addEventListener('click', function() {
		self.hide();
	});
	this.login.addEventListener('click', this._onLogin.bind(this));
	this.container.addEventListener('keydown', this._onEnter.bind(this));

}
extend(LoginForm.prototype,{
	 show: function() {
	 	document.body.appendChild(this.container);
		this.mask.style.display = 'block';
		this.form.style.display = 'block';
	},
	hide: function() {
		this.form.style.display = 'none';
		this.mask.style.display = 'none';
	},
	_onLogin: function() {
		this.emit('login');
	},
	_onEnter: function (event) {
		if(event.keyCode == 13){
			this.emit('login');
		}
		
	},
	
});
extend(LoginForm.prototype, emitter);

/*
* Notice 模块
*/
function Notice(opt) {

	var options = opt||{};
	var notice = this;

	extend(this, options);	
	this.newNotice = this.getContent();
	this.md5 = b64_md5(this.newNotice.innerHTML);
	this.parent = this.contentNode.parentNode;
	this.parent.replaceChild(this.newNotice, this.contentNode);
	this.eventNode.addEventListener("click", function(event) {
		notice.hide();
	});
	this.checkCookie();
}
extend(Notice.prototype, {	
	checkCookie: function() {
		if(getcookie()['notice']==this.md5){
			return;
		}
		this.parent.style.display='block';		
	},
	hide: function() {
		this.parent.style.display='none';		
		setCookie('notice',this.md5);
	},
	show: function() {
		removeCookie('notice');
		this.checkCookie();
	}
});

/*
	Banner模块 轮播图
*/
function Banner(opt) {
	var options = opt || {};

	this.template = '<div class="imgwrap">\
	                    <a href="">\
	                        <img src="./img/banner1.jpg" alt="banner1">\
	                    </a>\
	                </div>'
	extend(this, opt);
	this.container.appendChild(html2node(this.template));
	this.link = this.container.getElementsByTagName('a')[0];
	this.img = this.link.getElementsByTagName('img')[0];
	this.count = 0;

}
extend(Banner.prototype, {
	show : function (num){
		this.img.style.opacity = 0;
		this.img.style.transition = '';
		this.img.src = this.list[num]['link'];
		setTimeout(function () {
			this.img.style.transition = '0.5s';
			this.img.style.opacity = 1;
		}.bind(this), 30);
		
	},
	next: function() {
		this.count += 1;
		this.count = this.count % this.list.length;
		this.show(this.count);
	}
});