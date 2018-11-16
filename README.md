# disconnected

Enables `connected` and `disconnected` element's listeners.

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

The module is compatible with every browser, as long as usable `Event` and `WeakSet` are provided.

### Compatibility

Even IE9.

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