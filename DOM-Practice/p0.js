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
function getElementChildren(e){
	if(e.children){
		return e.children;
	}else{

		/* compatible other browse */
		var i, len, children = [];
		var child = element.firstChild;
		if(child != element.lastChild){
			while(child != null){
				if(child.nodeType == 1){
						children.push(child);
					}
				child = child.nextSibling;
			}
		}
		else{
			children.push(child);
		}
		return children;
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


function Banner(opt) {
	var options = opt || {};
	this.imgwrap = '<div class="imgwrap">\
	                    <a href="">\
	                        <img src="./img/banner1.jpg" alt="banner1">\
	                    </a>\
	                </div>';
	this.ctrl = html2node('<div class="ctrl"></div>');
	extend(this, opt);
	this.wrap = html2node(this.imgwrap);
	this.pointer = document.createElement('ul');
	//this.pointer.className = 'ctrl';
	for(var i = 0; i< this.list.length; i++){
		var li = document.createElement('li');
		function callback(count) {
			
			return function () {
				this.count = count;
				this.show(count);
				
			}.bind(this);
		}
		li.addEventListener('click', callback.call(this,i));
		this.pointer.appendChild(li);
	}
	this.container.appendChild(this.wrap);
	this.ctrl.appendChild(this.pointer);
	this.wrap.appendChild(this.ctrl);
	this.link = this.container.getElementsByTagName('a')[0];
	this.img = this.link.getElementsByTagName('img')[0];
	this.oldnum = 0;
	this.count = 0;
	this.init();
}
extend(Banner.prototype, {
	init : function () {
		var image = [];
		for (var i = 0; i < this.list.length; i++) {
				image[i] = new Image();
				image[i].src = this.list[i]['src'];
			}	
	},
	show : function (num){		
		this.img.style.opacity = 0;
		this.img.style.transition = '';
		this.img.src = this.list[num]['src'];
		this.link.href = this.list[num]['href'];
		this.pointer.getElementsByTagName('li')[this.oldnum].className = '';			
		this.pointer.getElementsByTagName('li')[num].className = 'current';
		setTimeout(function () {
			this.img.style.transition = '0.5s';
			this.img.style.opacity = 1;
		}.bind(this), 30);
		this.oldnum = num;
		
	},
	next: function() {
		this.count += 1;
		this.count = this.count % this.list.length;
		this.show(this.count);
	},
	loop: function () {
		//鼠标移上 停止轮播
		this.wrap.addEventListener('mouseover', function () {
			window.clearInterval(this.interval);	
			// console.log('stop');		
		}.bind(this));
		//鼠标移出 继续轮播
		this.wrap.addEventListener('mouseout', function () {			
			this.interval = setInterval(function () {
				this.next();
			}.bind(this), this.time);
			// console.log('go');
		}.bind(this));
		//自动开始轮播
		this.interval = setInterval(function () {
			this.next();
		}.bind(this), this.time);
	}
});


function TAB(opt) {
	var options = opt || {};
	extend(this, options);
	//debugger;
	this._init();
	this.change(this.active);
}
extend(TAB.prototype,{
	_init : function() {
		var ul = document.createElement('ul');
		for(var card in this.cards){
			var li = document.createElement('li');
			li.className = card;
			li.innerHTML = '<a>'+this.cards[card]+'</a>'
			li.addEventListener('click', function () {
				var name = card;
				return function () {
					this.change(name);
				}.bind(this);
			}.call(this))
			ul.appendChild(li);

			var div = document.createElement('div');
			div.className = card;
			this.board.appendChild(div);
		}
		this.topbar.appendChild(ul);

	},
	change: function(name) {
		//clear		
		var a = {};
		while(a = this.container.getElementsByClassName('z-active')[0]){
			var newname = a.className.replace(/\sz-active/, '');
			a.className = newname;
		}
		//set
		var e = this.container.getElementsByClassName(name);
		for(var i =0; i<e.length; i++){
			e[i].className = name + ' z-active';
		}
		//fill
		this.fill(this.board.getElementsByClassName('z-active')[0]);
		
	},

});

function Pager(opt) {
	var options = opt || {};
	extend(this,options);
	this.lis = [];
	//this.start = 1;
	this._init();
}
extend(Pager.prototype, {
	_init:function () {
		//this.max = this.ul.children.length-2;
		for(var i = 0; i < this.ul.children.length-1; i++){
			this.lis[i]=this.ul.children[i+1];
			this.lis[i].addEventListener('click', function () {
				var count = i;
				return function () {
					this._onclick(count);
				}.bind(this);
			}.call(this));
		}
	},
	_refresh:function () {
		for(var i = 0; i < this.lis.length; i++){
			templi.innerHTML = ''+this.start+i;
		}
	},
	_onclick:function(count) {
		this.emit('click',count);
		//alert(count);
	}
});
extend(Pager.prototype,emitter);
function getCourse(courseType) {
	
	function onSucess(response) {
		
		var info = JSON.parse(response);
		//var courcelist = document.createElement('ul');
		this.className = 'course clearfix';
		this.innerHTML = '';
		for(var i = 0; i < info.list.length; i++){
			var ele = info.list[i];
			if(ele.price == 0){
				ele.price = '免费';
			}
			else{
				ele.price = '¥ '+ele.price;
			}

			var str = '<li>\
				<div class="picwrap">\
				    <img src="'+ele.middlePhotoUrl+'" alt="">\
				</div>\
				<div class="title"><p>'+ele.name+'</p></div>\
				<a class="provider">'+ele.provider+'</a>\
				<div>\
				    <span class="learner">'+ele.learnerCount+'</span>\
				    <p class="price">'+ele.price+'</p>\
				</div>\
			</li>'
			var li = html2node(str);

			this.appendChild(li);
		}

		// var xxx = document.getElementsByClassName('course')[0];
		// this.parentNode.replaceChild(courcelist, xxx);
	};
	httpGET('http://study.163.com/webDev/couresByCategory.htm',onSucess.bind(this),courseType);
	
	// return result;
}
function getHotCourse() {
	function onSucess(response) {
		var info = JSON.parse(response);
	}


	httpGET('http://study.163.com/webDev/hotcouresByCategory.htm',function (response) {
			
			var xxx = JSON.parse(response);
		});
}