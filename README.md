# disconnected

[![Build Status](https://travis-ci.com/WebReflection/disconnected.svg?branch=master)](https://travis-ci.com/WebReflection/disconnected) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/disconnected.svg)](https://greenkeeper.io/) ![WebReflection status](https://offline.report/status/webreflection.svg)

In less than 0.5K, it enables `connected` and `disconnected` element's listeners in [hyperHTML](https://github.com/WebReflection/hyperHTML#hyperhtml), but it can also be used with any other library/vanilla JS.

The only optional dependencies it has are constructable `Event` and the `WeakSet`. Both must be passed along as configuration object, and polyfills might be needed only for legacy browsers.

```js
// requires both modern Event and WeakSet
import disconnected from 'disconnected';
const observe = disconnected({Event, WeakSet});

observe(mainElement);
mainElement.addEventListener('connected', () => {
  console.log('I am alive ;-)');
});
mainElement.addEventListener('disconnected', () => {
  console.log('but now I am out O_O');
});

observe(subElement);
observe(topElement);
observe(anyElement);
```


### Compatibility

[Even IE9](https://webreflection.github.io/disconnected/test/), as long as a usable `Event` and `WeakSet` are provided.


### What about `attributechanged` ?

You [got it](https://github.com/WebReflection/attributechanged), sharing same API, needing same `Event` poly, if necessary.


### DOM Level 0 Like events ?

Using [with-level-0](https://github.com/WebReflection/with-level-0) would make it possible to have `el.onconnected = ...` simplification too.
```js
withLevel0('connected');
withLevel0('disconnected');

// remember to observe the node
var div = observe(document.createElement('div'));

// add your Level 0 listener
div.onconnected = function () {
  div.textContent = 'Level 0';
};

// that's it!
document.body.appendChild(div);

// feel free to clean it up via
div.onconnected = null;
```
