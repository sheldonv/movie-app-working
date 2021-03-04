export const addEvent = (() => {
    if ( window.addEventListener ) {
        /// I'm returning a closure after the choice on which method to use
        /// has been made, so as not to waste time doing it for each event added.
        return function(elm, eventName, listener, useCapture){
          return elm.addEventListener(eventName,listener,useCapture||false);
        };
      }
      /// attachEvent works for Internet Explorer
      else if ( window.attachEvent ) {
        return function(elm, eventName, listener){
          /// IE expects the eventName to be onclick, onfocus, onkeydown (and so on)
          /// rather than just click, focus, keydown as the other browsers do.
          return elm.attachEvent('on'+eventName,listener);
        };
      }
})();