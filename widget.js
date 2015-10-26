(function(window, document, undefined) {
  // Constants
  var IFRAME_CLASS = '__synaps-iframe',
      SUMMARY_CLASS = '__synaps-iframe-summary',
      TOPBAR_CLASS = '__synaps-iframe-with-topbar',
      DETAIL_CLASS = '__synaps-iframe-detail',
      HEIGHT_FULL_CLASS = '__synaps-iframe-height-full',

      ELECTION_ATTR = 'synaps-secim',
      TOPBAR_ATTR = 'topbar',
      DETAILURL_ATTR = 'detail-url',
      HEIGHT_ATTR = 'height',
      CITYCODE_ATTR = 'city-code',

      DEBUG_INITIATOR = '__synaps_test',

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
        addCSSClassRule(sheet, HEIGHT_FULL_CLASS, "height: 100%", 4);

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
    var elements = document.querySelectorAll('['+ELECTION_ATTR+'],[data-'+ELECTION_ATTR+']');

    if (elements.length > 0) {
      ensureStylesReady();

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var iframe = document.createElement('iframe');
        var url = window.__synaps_election_url || BASE_URL;

        iframe.classList.add(IFRAME_CLASS);

        var params = {
          iframe: true
        };

        var mode = getAttribute(element, ELECTION_ATTR);
        if (mode == 'ozet') {
          url += 'ozet/';
          iframe.classList.add(SUMMARY_CLASS);

          if (hasAttribute(element, TOPBAR_ATTR)) {
            params.topbar = true;
            iframe.classList.add(TOPBAR_CLASS);
          }
        } else {
          iframe.classList.add(DETAIL_CLASS);
        }

        var height = getAttribute(element, HEIGHT_ATTR);

        if (height == 'full') {
          iframe.classList.add(HEIGHT_FULL_CLASS);
        }

        if (height == 'auto' || !height) {
          params.height = 'auto';
          window.addEventListener("message", function (event) {
            if (event.data > 0) {
              iframe.style.height = event.data + 'px';
            }
          }, false);
        }

        iframe.style.maxHeight = window.innerHeight + 'px';

        if (hasAttribute(element, DETAILURL_ATTR)) {
          params['detailurl'] = getAttribute(element, DETAILURL_ATTR);
        }

        var cityCode = getAttribute(element, CITYCODE_ATTR);
        if (cityCode) {
          params['city'] = cityCode;
        }

        iframe.src = url + '?' + getQuerystring(params);
        element.appendChild(iframe);
      }
    }
  }


  var now = new Date(),
      electionDate = new Date('2015-11-01');

  if (now > electionDate || window[DEBUG_INITIATOR] || window.location.href.indexOf(DEBUG_INITIATOR) > -1) {
    init();
  }

  window.Synaps = {
    init: init
  };

})(window, document);
