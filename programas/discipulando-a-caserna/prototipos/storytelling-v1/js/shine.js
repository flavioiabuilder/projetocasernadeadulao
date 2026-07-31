/* Brilho do cursor + reflexo metálico (logo e assinatura) */
(function(){
  var mqFine=window.matchMedia('(hover: hover) and (pointer: fine)');
  var mqReduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!mqFine.matches||mqReduce.matches) return;

  var luz=document.createElement('div');
  luz.className='luz-cursor';
  luz.setAttribute('aria-hidden','true');
  document.body.appendChild(luz);

  var metais=[];
  var raf=0;
  var x=innerWidth/2,y=innerHeight/2,tx=x,ty=y,ativa=false;

  function limparAlvo(wrap){
    wrap.style.setProperty('--brilho','0');
    wrap.classList.remove('brilhando');
    var img=wrap.querySelector&&wrap.querySelector('img.emblema');
    if(img) img.style.filter='';
  }
  function limparTudo(){
    ativa=false;
    luz.classList.remove('ativa');
    for(var i=0;i<metais.length;i++) limparAlvo(metais[i]);
  }
  function addBrilho(alvo){
    if(!alvo||alvo.querySelector('.emblema-brilho')) return;
    var brilho=document.createElement('span');
    brilho.className='emblema-brilho';
    brilho.setAttribute('aria-hidden','true');
    alvo.appendChild(brilho);
    metais.push(alvo);
  }
  function marcarInterativo(el,ligado){
    if(!el) return;
    el.classList.toggle('interativo',!!ligado);
  }
  function syncInterativo(){
    metais.forEach(function(el){
      var op=parseFloat(getComputedStyle(el).opacity);
      marcarInterativo(el,op>0.55);
    });
  }

  [].forEach.call(document.querySelectorAll('img.emblema'),function(img){
    if(img.closest('.emblema-metal')) return;
    var wrap=document.createElement('span');
    wrap.className='emblema-metal';
    img.parentNode.insertBefore(wrap,img);
    wrap.appendChild(img);
    addBrilho(wrap);
    function aplicaSrc(){
      var src=img.currentSrc||img.src;
      if(src) wrap.style.setProperty('--emblema-src','url("'+src.replace(/"/g,'%22')+'")');
    }
    if(img.complete) aplicaSrc();
    else img.addEventListener('load',aplicaSrc,{once:true});
  });
  [].forEach.call(document.querySelectorAll('.s01-id'),function(el){ metais.push(el); });

  /* habilita hit-test só depois do fade-in (opacity 0 ainda captura mouse) */
  setTimeout(syncInterativo,50);
  setTimeout(syncInterativo,1400);
  setTimeout(syncInterativo,4200);
  metais.forEach(function(el){
    el.addEventListener('animationend',function(){ marcarInterativo(el,true); });
  });

  function frame(){
    if(document.hidden){ raf=requestAnimationFrame(frame); return; }
    x+=(tx-x)*0.22;
    y+=(ty-y)*0.22;
    luz.style.setProperty('--lx',x.toFixed(1)+'px');
    luz.style.setProperty('--ly',y.toFixed(1)+'px');
    for(var i=0;i<metais.length;i++){
      var wrap=metais[i];
      var isTexto=wrap.classList.contains('s01-id');
      if(!wrap.classList.contains('interativo')){
        limparAlvo(wrap);
        continue;
      }
      var alvo=isTexto?(wrap.querySelector('strong')||wrap):wrap;
      var r=alvo.getBoundingClientRect();
      if(r.width<2||r.height<2){ limparAlvo(wrap); continue; }

      /* inset na logo: ignora margens escuras do PNG */
      var insetX=isTexto?0:r.width*0.08;
      var insetY=isTexto?0:r.height*0.06;
      var left=r.left+insetX, right=r.right-insetX, top=r.top+insetY, bottom=r.bottom-insetY;
      var sobre=ativa&&tx>=left&&tx<=right&&ty>=top&&ty<=bottom;
      if(!sobre){ limparAlvo(wrap); continue; }

      var hitW=Math.max(1,right-left), hitH=Math.max(1,bottom-top);
      var ex=((tx-left)/hitW)*100;
      var ey=((ty-top)/hitH)*100;
      wrap.style.setProperty('--ex',Math.max(0,Math.min(100,ex)).toFixed(2)+'%');
      wrap.style.setProperty('--ey',Math.max(0,Math.min(100,ey)).toFixed(2)+'%');
      wrap.style.setProperty('--brilho','1');
      wrap.classList.add('brilhando');
      if(!isTexto){
        var img=wrap.querySelector('img.emblema');
        if(img) img.style.filter='brightness(1.28) contrast(1.12) saturate(1.14)';
      }
    }
    raf=requestAnimationFrame(frame);
  }

  function onMove(e){
    if(e.pointerType&&e.pointerType!=='mouse') return;
    tx=e.clientX; ty=e.clientY;
    if(!ativa){ ativa=true; luz.classList.add('ativa'); }
  }
  function onLeave(){ limparTudo(); }

  document.addEventListener('pointermove',onMove,{passive:true});
  document.documentElement.addEventListener('mouseleave',onLeave);
  window.addEventListener('blur',onLeave);
  document.addEventListener('visibilitychange',function(){
    if(document.hidden) limparTudo();
  });

  raf=requestAnimationFrame(frame);
})();
