// ==UserScript==
// @name         rawMathJax
// @namespace    https://wmeluna.com/
// @version      0.1
// @description  shows the raw mathjax script, easier to copy paste to chatgpt
// @author       WmeLuna
// @match        https://www.knewton.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=knewton.com
// @grant        none
// @run-at       document-start
// ==/UserScript==
var link=document.createElement("link");link.rel="stylesheet",link.type="text/css",link.href="https://wmeluna.com/knewton/css/mathjax.css",document.head.appendChild(link),document.addEventListener("click",(e=>{e.target.closest('section > div > div[class] script[id^="MathJax-Element"]')&&navigator.clipboard.writeText(e.target.textContent).then((()=>{const e=Object.assign(document.createElement("div"),{textContent:"Copied!",style:"position:fixed;bottom:20px;right:20px;background:#000;color:#fff;padding:10px;"});document.body.appendChild(e),setTimeout((()=>e.remove()),2e3)}))}));