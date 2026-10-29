/* Runs on the Tilda page next to the full-screen CV iframe (block code: tilda-embed.html).
   On iOS a tap on the status bar scrolls only the top page, and the Tilda page cannot scroll,
   so the tap was lost. Here the page gets 2px of scroll and rests at 1px: a move to 0 is that tap,
   and it is passed to the CV, which scrolls itself to the top. */
(function(){
  var f = document.getElementById('akysh-cv');
  var ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if(!f || !ios || window.akyshTop) return;
  window.akyshTop = true;
  var st = document.createElement('style');
  st.textContent = 'html{height:100%!important;overflow:visible!important}body{height:auto!important;min-height:calc(100% + 2px)!important;overflow:visible!important}';
  document.head.appendChild(st);
  var w = innerWidth, turned = 0, t;
  function park(){ if(scrollY < 1) scrollTo(0, 1); }
  /* a rotation can reset the scroll, which must not throw the reader back to the top */
  addEventListener('resize', function(){ if(innerWidth !== w){ w = innerWidth; turned = Date.now(); } }, {passive:true});
  addEventListener('scroll', function(){
    if(scrollY > .5) return;
    clearTimeout(t);
    t = setTimeout(function(){
      if(Date.now() - turned > 800 && f.src) f.contentWindow.postMessage('ba-scroll-top', new URL(f.src).origin);
      park();
    }, 50);
  }, {passive:true});
  park(); addEventListener('load', park); addEventListener('pageshow', park);
})();
