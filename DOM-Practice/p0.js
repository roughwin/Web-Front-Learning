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

