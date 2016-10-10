![img](http://i62.tinypic.com/2ui8xmp.jpg)

### A comprehensive requestAnimationFrame & cancelAnimationFrame polyfill.

- Supports ES6 - AMD - CJS & IIFE 
- Provides a clean polyfill for requestAnimationFrame & cancelAnimationFrame.
- Tested & working on: IE 5.5+, FF 3+, Opera 11.16+, Safari 4+, Chrome 14+, iOS 3+, Android 2.3+, Android Chrome 28+.  
- **iOS 6 bug fix** without user-agent sniffing.
- **Firefox 4 - 10 function mismatch normalization**.
- Doesn't modify native functions unless specified.
- AMD compliant.

#### Install options

`npm i request-frame --save` **&nbsp;&nbsp;|&nbsp;&nbsp;** `bower i request-frame` **&nbsp;&nbsp;|&nbsp;&nbsp;** [src](https://github.com/julienetie/request-frame/tree/master/dist) **&nbsp;&nbsp;|&nbsp;&nbsp;** [release](https://github.com/julienetie/request-frame/releases)


```javascript
import requestFrame from 'request-frame';  // ES6
```

```javascript
<script src="request-frame.js"></script> // AMD, IIFE
```

```javascript
const requestFrame = require('request-frame');  // CJS
```


### The API:
#### Assign the timing functions:
*requestFrame( request | cancel | native )*  request is default. 
```javascript
var request = requestFrame('request'); // window.requestAnimationFrame | setTimeout
var cancel = requestFrame('cancel'); // window.cancelAnimationFrame | cancelTimeout
```
#### Or re/ assign native functions:
```javascript
requestFrame('native'); // re/ declares requestAnimationFrame & cancelAnimationFrame
```
Below is just an example of the requestAnimationFrame API, see links: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), [MSDN](https://msdn.microsoft.com/en-us/library/windows/apps/hh453388.aspx) & [W3](http://www.w3.org/TR/2011/WD-html5-20110525/timers.html). 

#### Loop something:
```javascript
var requestId;

function something( useTimeStamp ){
    
    // Do something here
    
    requestId = request(something); 
}

requestId = request(something); // Assigns Id & calls "something"
```

#### Cancel something:

```javascript
cancel(requestId);  // Cancels frame request 
```

### The ideology
request-frame aims to provide an optimal development consistency with the use of animation timing functions across the large number of browsers and devices. This lib is ideal for those who may want to avoid re-assigning native functions, or avoid interfering with other libs that do. requestFrame() is purposely not a constructor. The intention is for requestAnimationFrame to be used once or few times during execution since multiple task are expected to be more efficient via a single requestAnimationFrame loop compared to several instances.

### Browsers tested & passing:

Supports everything from IE5+

[<img style="float: left; display: inline-block;" src="http://i61.tinypic.com/i1xuzd.jpg" width="380">](http://i61.tinypic.com/i1xuzd.jpg)

[<img style="float: left; display: inline-block;"  src="http://i57.tinypic.com/j7fg2x.jpg" width="380">](http://i57.tinypic.com/j7fg2x.jpg)

    

### Contribute
Just do it!

#### Test 
`npm run test` 
To launch port 9999 

- ./test/
- ./test/compatibility-assignation-amd.html   
- ./test/compatibility-assignation.html 
- ./test/compatibility-native-amd.html 
- ./test/compatibility-native.html 

_Browser based testing for RAF is imperative_

### Credits

Created by [Julien Etienne](https://gist.github.com/julienetie), timestamp by [ Erik Möller, Paul Irish](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) & [Darius Bacon](https://github.com/darius/requestAnimationFrame).

--- 

[MIT License](https://github.com/julienetie/resizilla/blob/master/LICENSE) 

&#169; 2016 Julien Etienne 
