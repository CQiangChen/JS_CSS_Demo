var count = 1;
var container = document.getElementById('container');

function getUserAction(e){
  container.innerHTML = count++;
}

/**
 * 使用时间戳实现简单的节流
 * @param {*} func 
 * @param {*} wait 
 */
// function throttle(func, wait){
//   var previous = 0;

//   return function(){
//     var now = +new Date();

//     if(now - previous > wait){
//       func.apply(this,arguments);
//       previous = now;
//     }
//   }
// }

/**
 * 利用定时器+时间戳实现有头无尾，无头有尾，有头有尾的三种节流方式
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 
 */
function throttle(func, wait, options={}){
  var previous = 0;
  var timeout;
  var previous = 0;
  var now = 0;
  var defaultOptins = {
    leading:false,
    trailing:true
  }
  Object.assign(defaultOptins,options);

  var throttle = function(){
    if(!timeout){
      if(defaultOptins.leading === defaultOptins.trailing){
        if(!defaultOptins.leading){
          console.log('不执行leading和trailing同为false的情况');
          return;
        }else{
          now = +new Date();
        }
      }
      timeout = setTimeout(()=>{
        timeout = null;
        if(defaultOptins.leading === false || (now - previous < wait && now - previous != 0)){
          func.apply(this, arguments);
          if(now - previous !== 0){
            previous = 0;
          }
        }
      },wait)
      if(defaultOptins.trailing === false || (now - previous > wait && now - previous != 0)){
        func.apply(this, arguments);
        if(now - previous !== 0){
          previous = now;
        }
      }

    }
  }

  return throttle;

}

var options = {
  leading:true,
  trailing:true,
}

container.onmousemove = throttle(getUserAction,3000,options);