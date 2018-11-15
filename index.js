/*! (c) Andrea Giammarchi */
function disconnected(poly) {'use strict';
  var CONNECTED = 'connected';
  var DISCONNECTED = 'dis' + CONNECTED;
  var Event = poly.Event;
  var WeakSet = poly.WeakSet;
  var notObserving = true;
  var observer = new WeakSet;
  return function observe(node) {
    if (notObserving) {
      notObserving = !notObserving;
      startObserving(node.ownerDocument);
    }
    observer.add(node);
    return node;
  };
  function startObserving(document) {
    var dispatched = null;
    try {
      (new MutationObserver(changes)).observe(
        document,
        {subtree: true, childList: true}
      );
    }
    catch(o_O) {
      var timer = 0;
      var records = [];
      document.addEventListener(
        'DOMNodeRemoved',
        function (event) {
          reschedule({addedNodes: [], removedNodes: [event.target]});
        },
        true
      );
      document.addEventListener(
        'DOMNodeInserted',
        function (event) {
          reschedule({addedNodes: [event.target], removedNodes: []});
        },
        true
      );
      function reschedule(record) {
        records.push(record);
        clearTimeout(timer);
        timer = setTimeout(
          function () {
            changes(records.splice(timer = 0, records.length));
          },
          0
        );
      }
    }
    function changes(records) {
      dispatched = new Tracker;
      for (var record, i = 0, length = records.length; i < length; i++) {
        record = records[i];
        dispatchAll(record.removedNodes, DISCONNECTED, CONNECTED);
        dispatchAll(record.addedNodes, CONNECTED, DISCONNECTED);
      }
      dispatched = null;
    }
    function dispatchAll(nodes, type, counter) {
      for (var
        node,
        event = new Event(type),
        i = 0, length = nodes.length; i < length; i++
      ) {
        node = nodes[i];
        if (node.nodeType === 1)
          dispatchTarget(node, event, type, counter);
      }
    }
    function dispatchTarget(node, event, type, counter) {
      if (observer.has(node) && !dispatched[type].has(node)) {
        dispatched[counter].delete(node);
        dispatched[type].add(node);
        node.dispatchEvent(event);
      }
      for (var
        children = node.children,
        i = 0, length = children.length; i < length; i++
      ) {
        dispatchTarget(children[i], event, type, counter);
      }
    }
    function Tracker() {
      this[CONNECTED] = new WeakSet;
      this[DISCONNECTED] = new WeakSet;
    }
  }
}
