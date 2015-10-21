(function(window, document, undefined) {
  // Constants
  var IFRAME_CLASS = '__synaps-iframe',
      SUMMARY_CLASS = '__synaps-iframe-summary',
      TOPBAR_CLASS = '__synaps-iframe-with-topbar',
      DETAIL_CLASS = '__synaps-iframe-detail',

      TOKEN_ATTR = 'synaps-token',
      ELECTION_ATTR = 'synaps-secim',
      TOPBAR_ATTR = 'topbar',
      DETAILURL_ATTR = 'detail-url',

      BASE_URL = 'https://secim-demo.synaps.ly/';

  // Ensures needed styles has injected
  var ensureStylesReady = (function () {
    var stylesReady = false;

    return function () {
      if (!stylesReady) {
        var sheet = (function() {
          // Create the <style> tag
          var style = document.createElement("style");

          // WebKit hack :(
          style.appendChild(document.createTextNode(""));

          // Add the <style> element to the page
          document.head.appendChild(style);

          return style.sheet;
        })();

        function addCSSClassRule(sheet, selector, rules, index) {
          selector = '.' + selector;

          if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
          }
          else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
          }
        }

        // Add style rules for needed classes
        addCSSClassRule(sheet, IFRAME_CLASS, "width: 100%; border: none;", 0);
        addCSSClassRule(sheet, SUMMARY_CLASS, "height: 125px", 1);
        addCSSClassRule(sheet, TOPBAR_CLASS, "height: 160px", 2);
        addCSSClassRule(sheet, DETAIL_CLASS, "height: 400px", 3);

        stylesReady = true;
      }
    };
  })();

  var getQuerystring = function (params) {
    var parts = [];

    for(var key in params) {
      if (params[key] === true) {
        parts.push(key);
      } else {
        parts.push(key + '=' + encodeURI(params[key]));
      }
    }

    return parts.join('&');
  };

  var getAttribute = function (element, attribute) {
    return element.getAttribute(attribute) || element.getAttribute('data-' + attribute);
  };

  var hasAttribute = function (element, attribute) {
    return element.hasAttribute(attribute) || element.hasAttribute('data-' + attribute);
  };

  var init = function () {
    var inject = document.querySelector('[data-'+TOKEN_ATTR+'],['+TOKEN_ATTR+']');
    var token = '';
    if (!inject) {
      token = getAttribute(inject, TOKEN_ATTR);
    }

    var elements = document.querySelectorAll('['+ELECTION_ATTR+'],[data-'+ELECTION_ATTR+']');

    if (elements.length > 0) {
      ensureStylesReady();

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var iframe = document.createElement('iframe');
        var url = window.__synaps_election_url || BASE_URL;

        iframe.classList.add(IFRAME_CLASS);

        var params = {
          token: token,
          iframe: true
        };

        var mode = getAttribute(element, ELECTION_ATTR);
        if (mode == 'ozet') {
          url += 'ozet';
          iframe.classList.add(SUMMARY_CLASS);

          if (hasAttribute(element, TOPBAR_ATTR)) {
            params.topbar = true;
            iframe.classList.add(TOPBAR_CLASS);
          }
        } else {
          iframe.classList.add(DETAIL_CLASS);
        }

        if (hasAttribute(element, DETAILURL_ATTR)) {
          params['detailurl'] = getAttribute(element, DETAILURL_ATTR);
        }

        iframe.src = url + '?' + getQuerystring(params);
        element.appendChild(iframe);
      }
    }
  }

  init();

  window.Synaps = {
    init: init
  };

})(window, document);
