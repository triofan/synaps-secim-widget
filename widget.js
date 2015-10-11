(function(window, document, undefined) {
  var elements = document.querySelectorAll('[synaps-secim],[data-synaps-secim]');

  if (elements.length > 0) {
    var sheet = (function() {
      // Create the <style> tag
      var style = document.createElement("style");

      // Add a media (and/or media query) here if you'd like!
      // style.setAttribute("media", "screen")
      // style.setAttribute("media", "only screen and (max-width : 1024px)")

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

    addCSSRule(".__synaps-iframe", "width: 100%; height: 200px", 1);

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var iframe = document.createElement('iframe');
      var url = 'https://secim.synaps.ly/';
      if (window.__synaps_election_url) {
        url = window.__synaps_election_url;
      }

      iframe.src = url + '?iframe';
      iframe.setAttribute('class', '__synaps-iframe');
      element.appendChild(iframe);
    }
  }
})(window, document);
