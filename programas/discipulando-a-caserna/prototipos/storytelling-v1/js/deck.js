(function(){
  var deck=document.getElementById('deck');
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var topo=document.getElementById('topo'), rodape=document.getElementById('rodape');
  var posEl=document.getElementById('pos'), tempoEl=document.getElementById('tempo');
  var armIcs=[].slice.call(document.querySelectorAll('.arm-ic'));
  var ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  var atual=0;

  function aplica(i){
    var s=slides[i]; if(!s) return;
    atual=i;
    var ato=+s.dataset.ato, arm=+s.dataset.arm;
    var escuroPuro=s.className.indexOf('bg-sombra')>-1||s.className.indexOf('bg-caserna')>-1;
    var transicao=s.className.indexOf('bg-transicao')>-1;
    var topoEscuro=escuroPuro||transicao;
    topo.classList.toggle('escuro',topoEscuro);
    document.body.classList.toggle('chrome-escuro',topoEscuro);
    var semC=s.className.indexOf('sem-chrome')>-1;
    topo.classList.toggle('oculto',semC);
    rodape.classList.toggle('oculto',semC);
    rodape.classList.toggle('claro',escuroPuro);
    posEl.textContent='Ato '+ROM[ato-1]+' de X';
    var rest=Math.max(1,Math.round((slides.length-i)*0.42));
    tempoEl.textContent='~'+rest+' min restantes';
    armIcs.forEach(function(ic,k){ic.classList.toggle('on',k<arm);});
    try{localStorage.setItem('dac_story_v1_pos',s.id);}catch(e){}
    if(history.replaceState) history.replaceState(null,'','#'+s.id);
  }

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('visivel');aplica(slides.indexOf(e.target));}
    });
  },{root:deck,threshold:0.55});
  slides.forEach(function(s){io.observe(s);});

  function vai(d){var i=Math.min(slides.length-1,Math.max(0,atual+d));
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    slides[i].scrollIntoView({behavior:reduce?'auto':'smooth'});}
  document.getElementById('ant').onclick=function(){vai(-1);};
  document.getElementById('prox').onclick=function(){vai(1);};
  document.addEventListener('keydown',function(e){
    var t=e.target;
    var emControle=t&&t.closest&&t.closest('button,input,textarea,select,a,[role="button"],.acc-cab,.fbtn,.checklist,label');
    if(!emControle&&(e.key==='ArrowDown'||e.key==='PageDown')){e.preventDefault();vai(1);}
    if(!emControle&&e.key===' '){e.preventDefault();vai(1);}
    if(!emControle&&(e.key==='ArrowUp'||e.key==='PageUp')){e.preventDefault();vai(-1);}
    if(e.key==='Escape'){idx.classList.remove('aberto');}
  });

  var idx=document.getElementById('indice');
  document.getElementById('menu').onclick=function(){idx.classList.toggle('aberto');};
  idx.addEventListener('click',function(e){if(e.target.closest('a'))idx.classList.remove('aberto');});
  document.querySelector('.armadura').onclick=function(){idx.classList.toggle('aberto');};


  // resposta pastoral: os dados permanecem somente no estado atual da página
  var decisoes=[].slice.call(document.querySelectorAll('#decisao-pastoral input[type="checkbox"]'));
  var observacoes=document.getElementById('obs-geral');
  var copiar=document.getElementById('btn-copiar-resumo');
  var responder=document.getElementById('btn-mailto');
  var estadoCopia=document.getElementById('copiar-status');
  var assunto='Discipulando a Caserna — apreciação pastoral';
  function rotuloDecisao(item){
    var span=item.closest('li')&&item.closest('li').querySelector('span');
    return (span&&span.textContent.trim())||item.value||'';
  }
  function gerarResumo(){
    var lines=['Resumo de apreciação pastoral — Discipulando a Caserna','Data: '+new Date().toLocaleDateString('pt-BR'),''];
    decisoes.forEach(function(item){
      lines.push((item.checked?'[x]':'[ ]')+' '+rotuloDecisao(item));
    });
    lines.push('','Observações:');
    lines.push((observacoes&&observacoes.value.trim())||'(nenhuma)');
    return lines.join('\n');
  }
  function atualizarEmail(){
    if(!responder)return;
    var body=encodeURIComponent(gerarResumo());
    var sub=encodeURIComponent(assunto);
    responder.href='mailto:casernadeadulao@gmail.com?subject='+sub+'&body='+body;
  }
  function copiaAlternativa(texto){
    var campo=document.createElement('textarea');
    campo.value=texto;campo.setAttribute('readonly','');campo.style.position='fixed';campo.style.opacity='0';
    document.body.appendChild(campo);campo.select();
    var copiado=document.execCommand&&document.execCommand('copy');
    campo.remove();
    if(!copiado)throw new Error('cópia indisponível');
  }
  function copiarResumo(){
    if(!copiar)return;
    var texto=gerarResumo();
    var operacao=navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(texto):Promise.resolve().then(function(){copiaAlternativa(texto);});
    operacao.then(function(){if(estadoCopia)estadoCopia.textContent='Resumo copiado para a área de transferência.'; atualizarEmail();}).catch(function(){
      try{copiaAlternativa(texto);if(estadoCopia)estadoCopia.textContent='Resumo copiado.';}
      catch(e){if(estadoCopia)estadoCopia.textContent='Não foi possível copiar o resumo. Selecione o texto e tente novamente.';}
      atualizarEmail();
    });
  }
  if(decisoes.length){
    decisoes.forEach(function(item){item.addEventListener('change',atualizarEmail);});
    if(observacoes)observacoes.addEventListener('input',atualizarEmail);
    if(responder)responder.addEventListener('click',atualizarEmail);
    if(copiar)copiar.addEventListener('click',copiarResumo);
    atualizarEmail();
  }


  // retomada
  try{
    var salvo=localStorage.getItem('dac_story_v1_pos');
    if(salvo&&salvo!=='s01'&&!location.hash){
      var b=document.getElementById('retomar');
      var alvo=document.getElementById(salvo);
      if(alvo){
        var ato=+alvo.dataset.ato;
        b.textContent='Retomar de onde parou — Ato '+ROM[ato-1];
        b.classList.add('ver');
        b.onclick=function(){alvo.scrollIntoView();b.classList.remove('ver');};
        setTimeout(function(){b.classList.remove('ver');},14000);
      }
    }
  }catch(e){}

  // matriz
  var body=document.getElementById('mtbody');
  if(body){
    var cont=document.getElementById('mtcont');
    function filtra(m){
      var v=0;
      [].forEach.call(body.rows,function(r){
        var ok=(m===0)||(+r.dataset.mod===m);
        r.classList.toggle('oculta',!ok); if(ok)v++;
      });
      cont.textContent=v+' de 48 lições';
    }
    [].forEach.call(document.querySelectorAll('.fbtn'),function(b){
      b.onclick=function(){
        [].forEach.call(document.querySelectorAll('.fbtn'),function(x){x.classList.remove('ativo');});
        b.classList.add('ativo'); filtra(+b.dataset.f);
      };
    });
    filtra(1);


  }

  // anatomia
  [].forEach.call(document.querySelectorAll('.acc-cab'),function(b){
    b.onclick=function(){b.parentNode.classList.toggle('aberto');};
  });

  if(location.hash){var h=document.querySelector(location.hash);if(h)setTimeout(function(){h.scrollIntoView();},60);}
})();
