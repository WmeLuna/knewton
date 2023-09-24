// ==UserScript==
// @name         imSecureEnough
// @namespace    https://wmeluna.com/
// @version      0.1
// @description  Give more security by allowing you to not use the "Secure Browser"
// @author       WmeLuna
// @match        https://www.knewton.com/*
// @match        https://*knewton.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=knewton.com
// @grant        none
// @run-at       document-start
// ==/UserScript==
Object.defineProperty(window.navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) CLDB 2.0.6.02; Chrome/78.0.3904.87; Safari/537.36',
  writable: false
});

let _sb = true;
const obs = new MutationObserver(() => {
  if (window.context) {
    Object.defineProperty(window.context, 'secureBrowser', { get: () => _sb, set: () => _sb = true });
    obs.disconnect();
  }
});
obs.observe(document, { attributes: true, childList: true, subtree: true });