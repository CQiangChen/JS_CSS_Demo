// 学于https://blog.csdn.net/qq_33215972/article/details/79156558

var EventUtil = {
  /**
   * 兼容性处理
   */
  addHandler: function(element, type, handler) {
    if (element.addEventListener)
      element.addEventListener(type, handler, false);
    else if (element.attachEvent) element.attachEvent("on" + type, handler);
    else element["on" + type] = handler;
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener)
      element.removeEventListener(type, handler, false);
    else if (element.detachEvent) element.detachEvent("on" + type, handler);
    else element["on" + type] = handler;
  },
  /**
   *
   */
  listenTouchDirection: function(
    target,
    isPreventDefault,
    upCallback,
    rightCallback,
    downCallback,
    leftCallback
  ) {
    this.addHandler(target, "touchstart", handleTouchEvent);
    this.addHandler(target, "touchend", handleTouchEvent);
    this.addHandler(target, "touchmove", handleTouchEvent);
    var startX;
    var startY;
    function handleTouchEvent(event) {
      switch (event.type) {
        case "touchstart":
          startX = event.touches[0].pageX;
          startY = event.touches[0].pageY;
          break;
        case "touchend":
          var spanX = event.changedTouches[0].pageX - startX;
          var spanY = event.changedTouches[0].pageY - startY;
          
          if (Math.abs(spanX) > Math.abs(spanY)) {
            if (spanX > 30) {
              if (rightCallback){
                console.log('向右')
                rightCallback();
              }
            } else if (spanX < -30) {
              if (leftCallback){
                console.log('向左')
                leftCallback();
              }
            }
          } else {
            if (spanY > 30) {
              console.log(22);
              if (downCallback){
                console.log('向下')
                downCallback();
              }
            } else if (spanY < -30) {
              if (upCallback){
                console.log('向上')
                upCallback();
              }
            }
          }
          break;
        case "touchmove":
          //阻止默认行为
          if(isPreventDefault)
            event.preventDefault();
          break;
      }
    }
  }
};
