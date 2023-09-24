
// inject css
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://wmeluna.com/knewton/css/mathjax.css';
document.head.appendChild(link);

// copy on click
document.addEventListener('click', e => {
  if (e.target.closest('section > div > div[class] script[id^="MathJax-Element"]')) {
    navigator.clipboard.writeText(e.target.textContent).then(() => {
      const popup = Object.assign(document.createElement('div'), {
        textContent: 'Copied!', style: 'position:fixed;bottom:20px;right:20px;background:#000;color:#fff;padding:10px;'
      });
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 2000);
    });
  }
});
