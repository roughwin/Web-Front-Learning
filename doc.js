var pagelist=document.getElementById("page-list");
var dirname="./CSS-Demo/font/"
var filelist=new Array(
		"01_font-size.html",
		"02_font-family.html",
		"03_font-weight.html",
		"04_font-style.html",
		"05_line-height.html",
		"06_font.html",
		"07_color.html",
		"08_text-decoration.html",
		"09_text-align.html",
		"10_vertical-align.html",
		"11_text-indent.html",
		"12_white-space.html",
		"13_word-wrap.html",
		"14_word-break.html",
		"15_text-shadow.html",
		"16_text-overflow.html",
		"17_cursor.html",
		"18_inherit.html",
		"line-height-demo.html"
	);
for(var i=0;i<filelist.length;i++)
{
	var li=document.createElement("li");
	var lia=document.createElement("a");
	lia.href=dirname+filelist[i]
	var text=document.createTextNode(filelist[i]);
	li.appendChild(lia);
	lia.appendChild(text);
	pagelist.appendChild(li);
	
}
