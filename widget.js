(function(window, document, undefined) {

  var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
      if( MutationObserver ){
        // define a new observer
        var obs = new MutationObserver(function(mutations, observer){
            if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                callback();
        });
        // have the observer observe foo for changes in children
        obs.observe( obj, { childList:true, subtree:true });
      }
      else if( eventListenerSupported ){
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      }
    }
  })();

  // Observe a specific DOM element:
  observeDOM( document.body, function(){
    console.log('dom changed', arguments);
  });

  var inject = document.querySelector('[data-synaps-token],[synaps-token]');
  var token = '';
  if (!inject) {
    token = inject.getAttribute('synaps-token') || inject.getAttribute('data-synaps-token');
  }

  var elements = document.querySelectorAll('[synaps-secim],[data-synaps-secim]');

  if (elements.length > 0) {
    var sheet = (function() {
      // Create the <style> tag
      var style = document.createElement("style");

      // WebKit hack :(
      style.appendChild(document.createTextNode(""));

      // Add the <style> element to the page
      document.head.appendChild(style);

      return style.sheet;
    })();

    function addCSSRule(sheet, selector, rules, index) {
      if("insertRule" in sheet) {
        sheet.insertRule(selector + "{" + rules + "}", index);
      }
      else if("addRule" in sheet) {
        sheet.addRule(selector, rules, index);
      }
    }

    addCSSRule(sheet, ".__synaps-iframe", "width: 100%; border: none;", 0);
    addCSSRule(sheet, ".__synaps-iframe-summary", "height: 125px", 1);
    addCSSRule(sheet, ".__synaps-iframe-with-topbar", "height: 160px", 2);
    addCSSRule(sheet, ".__synaps-iframe-detail", "height: 400px", 3);

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var iframe = document.createElement('iframe');
      var url = 'https://secim.synaps.ly/';

      iframe.classList.add('__synaps-iframe');

      var params = {
        token: token,
        iframe: true
      };

      if (window.__synaps_election_url) {
        url = window.__synaps_election_url;
      }

      var mode = element.getAttribute('synaps-secim') || element.getAttribute('data-synaps-secim');
      if (mode == 'ozet') {
        url += '/ozet';
        iframe.classList.add('__synaps-iframe-summary');

        if (element.hasAttribute('topbar')) {
          params.topbar = true;
          iframe.classList.add('__synaps-iframe-with-topbar');
        }
      } else {
        iframe.classList.add('__synaps-iframe-detail');

      }

      if (element.hasAttribute('detail-url')) {
        params['detailurl'] = element.getAttribute('detail-url');
      }

      var quesystring = (function (){
        var parts = [];

        for(var key in params) {
          if (params[key] === true) {
            parts.push(key);
          } else {
            parts.push(key + '=' + encodeURI(params[key]));
          }
        }

        return parts.join('&');
      })();

      iframe.src = url + '?' + quesystring;
      element.appendChild(iframe);
    }
  }
})(window, document);
