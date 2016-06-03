var element = document.getElementById('rect');
var example = document.getElementById('example');

function getElementsByClassName(element, names){
        var arr = [];
        var nas = names.split(" ");
        var els = element.children;
        // var els = (element || document).getElementsByTagName('*');
        for(var i=0; i<els.length; i++){
            var k = els[i].className.split(" ");      //元素类名
            var count = nas.length;  //用于记录是否匹配完成
        
            //当要寻找的names长度小于或者等于元素类名长度时 names匹配完成即成功
            if(nas.length <= els.length){
                for(var j=0; j<k.length; j++){
                    for(var n=0; n<nas.length; n++){
                        if(k[j]==nas[n]){
                                --count;
                        }
                    }
            }
                if(count==0){
                    arr.push(els[i]);
                }
            }
            //当names长度大于元素类名长度时 匹配失败
            else{
                    break;
            }
        }
        return arr;
 }

function fadeout(element){
        var fadeout = setInterval(function(){
            element.style.opacity -= .01; 
            if(!element.style.opacity){
                    clearInterval(fadeout);
                }
        },10);           //1s钟运行100次
 }