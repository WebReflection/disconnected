/*! (c) Andrea Giammarchi */
function disconnected(e){"use strict";var u=e.Event,v=e.WeakSet,n=!0,f=null;return function(e){return n&&(n=!n,f=new v,function(n){var o=new v,r=new v;try{new MutationObserver(i).observe(n,{subtree:!0,childList:!0})}catch(e){var t=0,d=[],c=function(e){d.push(e),clearTimeout(t),t=setTimeout(function(){i(d.splice(t=0,d.length))},0)};n.addEventListener("DOMNodeRemoved",function(e){c({addedNodes:[],removedNodes:[e.target]})},!0),n.addEventListener("DOMNodeInserted",function(e){c({addedNodes:[e.target],removedNodes:[]})},!0)}function i(e){for(var n,t=e.length,d=0;d<t;d++)s((n=e[d]).removedNodes,"disconnected",r,o),s(n.addedNodes,"connected",o,r)}function s(e,n,t,d){for(var o,r=new u(n),c=e.length,i=0;i<c;1===(o=e[i++]).nodeType&&a(o,r,n,t,d));}function a(e,n,t,d,o){f.has(e)&&!d.has(e)&&(o.delete(e),d.add(e),e.dispatchEvent(n));for(var r=e.children||[],c=r.length,i=0;i<c;a(r[i++],n,t,d,o));}}(e.ownerDocument)),f.add(e),e}}