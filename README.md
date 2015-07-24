#resizilla v0.3
--- 
Window resize with debounce & requestAnimationFrame.  
 
    resizilla(handler, delay, inception).call(window); 
 
- handler: Function to execute on resize, 
- delay: Delay of the function call in ms on resize, 
- inception: If true the function call at the beginning of the detection period, if false the call will be at the end of the detection period (false by default), 

Recommendation: Use a moderate delay for consistency with legacy browsers. 

####Current Browser support: 

- Chrome 30+ 
- Safari 6.1+ 
- Firefox 30+ 
- Opera 24+ 
- IE10+ 
- Edge 
 
####Current bugs:

- Safari 6 
- Safari 5 
- Opera 12.1 
- FF10 r
- IE9 
- IE8 
 
####Mobile devices: 
 
window resizilla support is rarely necessary for for mobile devices, but can be
helpful with iframes. Mobile support (devices widths below 1024px) 
is inactive by default. To enable use: 
 
    resizilla.enableMobileResize();
 
The behavior of mobile orientation & resizing varies amongst devices. 

--- 

[MIT License](https://github.com/julienetie/resizilla/blob/master/LICENSE) 

Copyright (c) 2015 Julien Etienne 
