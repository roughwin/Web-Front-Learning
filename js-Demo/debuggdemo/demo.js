/**
 * 加法操作
 * @param {Number} a 第一个数
 * @param {Number} b 第二个数
 */
function add (a, b) {
  return a + b;
}

//获取节点
var nNum1  = document.getElementById('num1'),
    nNum2  = document.getElementById('num2'),
    nResult= document.getElementById('result'),
    nBtn    = document.getElementById('btn');

nBtn.addEventListener("click", onClickAdd, false);

function onClickAdd(){
  var a = parseInt(nNum1.value), //获取第一个数字
      b = parseInt(nNum2.value), //后去第二个数字
      result;
  result = add(a,b);  //执行加法操作
  nResult.innerHTML = result;  //显示
}


