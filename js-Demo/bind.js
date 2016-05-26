if (!Function.prototype.bind) {//如果原型上没有bind方法
  Function.prototype.bind = function (context) { 
    var args = arguments,//获取要传入的所有参数
        obj = arguments[0],//获取要绑定的上下文
        func = this;//获取要调用的函数
    return function(){//返回一个新的函数
        var argc = Array.prototype.slice.call(args,1);//获取bind的剩余传入参数
        Array.prototype.push.apply(argc,arguments);//将调用时的参数放到最后
        return func.apply(obj||null,argc);//使用新的this执行func函数
    }   
  }
}