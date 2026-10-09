(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const data=JSON.parse($('#site-data').textContent);
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu=$('.menu-toggle'), nav=$('#main-nav');
  function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');nav.classList.remove('open');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');nav.classList.toggle('open',open);});
  $$('a',nav).forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
  window.matchMedia('(min-width: 901px)').addEventListener('change',closeMenu);
  if('IntersectionObserver' in window && !reduce.matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:0.08});
    $$('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
    reduce.addEventListener('change',e=>{if(e.matches){$$('.will-reveal').forEach(el=>el.classList.add('revealed'));observer.disconnect();}});
  }
  const header=$('.site-header');let tick=false;
  function scrollStyle(){header.classList.toggle('scrolled',window.scrollY>30);tick=false;}
  window.addEventListener('scroll',()=>{if(!tick){requestAnimationFrame(scrollStyle);tick=true;}},{passive:true});scrollStyle();
  const cards=$$('.gallery-item');let filtered=cards.map((_,i)=>i);
  $$('.filter').forEach(button=>button.addEventListener('click',()=>{
    $$('.filter').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    filtered=[];cards.forEach((card,i)=>{const show=button.dataset.filter.startsWith('All ')||card.dataset.category===button.dataset.filter;card.hidden=!show;if(show){filtered.push(i);card.classList.add('revealed');}});
  }));
  const lightbox=$('#gallery-dialog');let activePhoto=0;
  function showPhoto(i){activePhoto=i;const image=$('img',lightbox);image.src=`assets/photo-${i}.webp`;image.alt=data.photos[i];$('#lightbox-caption').textContent=data.photos[i];$('.lightbox-source').href=data.posts[i];}
  cards.forEach((card,i)=>card.addEventListener('click',()=>{showPhoto(i);lightbox.showModal();document.body.classList.add('dialog-open');}));
  function step(n){const index=filtered.indexOf(activePhoto);showPhoto(filtered[(index+n+filtered.length)%filtered.length]);}
  $('.lightbox-prev').addEventListener('click',()=>step(-1));$('.lightbox-next').addEventListener('click',()=>step(1));
  lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}});
  const privacy=$('#privacy-dialog');$$('.privacy-open').forEach(button=>button.addEventListener('click',()=>{privacy.showModal();document.body.classList.add('dialog-open');}));
  $$('dialog').forEach(dialog=>{$('.dialog-close',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
  const form=$('.booking-form'),date=$('#date'),name=$('#guest-name'),result=$('.form-result');
  const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:form.dataset.timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  date.min=today();date.addEventListener('focus',()=>{date.min=today();});
  form.addEventListener('input',()=>{result.hidden=true;name.setCustomValidity('');date.setCustomValidity('');});
  form.addEventListener('change',()=>{result.hidden=true;date.setCustomValidity('');});
  $$('.service-select').forEach(a=>a.addEventListener('click',()=>{$('#service').value=a.dataset.service;result.hidden=true;}));
  $$('.branch-select').forEach(a=>a.addEventListener('click',()=>{if($('#branch'))$('#branch').value=a.dataset.branch;result.hidden=true;}));
  form.addEventListener('submit',e=>{
    e.preventDefault();name.setCustomValidity(name.value.trim()?'':'Please enter your name.');date.min=today();date.setCustomValidity(date.value<date.min?'Please choose today or a future date.':'');if(!form.reportValidity())return;
    const f=new FormData(form);const formatted=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date(f.get('date')+'T12:00:00'));
    const lines=[`Hi ${form.dataset.business}, I would like to enquire about an appointment.`,``,`Name: ${f.get('name').trim()}`,`Service: ${f.get('service')}`];
    if(f.get('branch'))lines.push(`Branch: ${f.get('branch')}`);
    lines.push(`Preferred date: ${formatted}`,`Preferred time: ${f.get('time')}`);
    if(f.get('notes').trim())lines.push(`Notes: ${f.get('notes').trim()}`);
    lines.push('','Please confirm availability, pricing and booking details. Thank you!');
    const message=lines.join('\n');$('.message-preview').textContent=message;$('.whatsapp-send').href=`https://wa.me/${form.dataset.phone}?text=${encodeURIComponent(message)}`;result.hidden=false;result.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'nearest'});
  });
  $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();
