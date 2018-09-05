var count = 1;
var container = document.getElementById('container');

function getUserAction(e){
  container.innerHTML = count++;
}

/**
 * 防抖函数
 * @param {*} func 执行方法
 * @param {*} wait 等待时间
 * @param {*} immediate true为立即执行，停止触发wait秒后才可继续向执行 false为触发后等待wait秒后执行
 */
function debounce(func, wait,immediate){
  var timeout = null;
  var result = null;
  var debounce = function(){
    if(timeout) clearTimeout(timeout);
    if(immediate){
      //如果已经执行过，不再执行,每次触发对timeout进行判断，执行中的timeout不为空，所以可以判断此时为 ‘执行过了’。
      var callNow = !timeout;
      //此处的setTimeout是为了防止func不断地进行变更，简单说就是延迟func的再次执行
      timeout = setTimeout(function(){
        console.log('--------setTimeout执行--------');
        timeout = null;
      },wait);
      console.log('------' + callNow + timeout + '-------');
      if(callNow){
        console.log('---------func方法执行---------');
        result = func.apply(this,arguments); 
      }
    }else{
     timeout = setTimeout(()=>{
        func.apply(this,arguments);  
     }, wait);
    }
    return result;
  };
  
  debounce.cancel = function(){
    clearTimeout(timeout);
    timeout = null;
  };

  return debounce;
}


var setUserAction = debounce(getUserAction,1000,true);

container.onmousemove = setUserAction;

document.getElementById('cancel').addEventListener('click',function(){
  setUserAction.cancel();
})
// container.onmousemove = getUserAction;