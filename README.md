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
