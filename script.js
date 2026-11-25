const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* menú móvil */
const toggle=$('.menu-toggle'),nav=$('.main-nav');
toggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(o))});
$$('a',nav).forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

/* barra de progreso + enlace activo */
const bar=document.createElement('div');bar.className='progress';$('.site-header').appendChild(bar);
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;bar.style.width=(scrollY/m*100)+'%'},{passive:true});
const links=$$('.main-nav a');
$$('main section[id]').forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+s.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe(s));

/* aparición al hacer scroll */
if(!calm){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
  $$('.services-intro,.service-item,.about-photo,.about-copy,.projects-heading,.project-card,.contact-content,.socials').forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--d',(i%3)*.12+'s');io.observe(el)});
}

/* parallax suave en el inicio */
const hero=$('.hero'),himg=$('.hero-image-wrap img'),chips=$$('.float-chip');
if(!calm)hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  himg.style.transform=`scale(1.08) translate(${x*-18}px,${y*-10}px)`;chips.forEach((c,i)=>c.style.translate=`${x*(i?26:-26)}px ${y*18}px`)});

/* inclinación 3D en fotos */
$$('.project-card').forEach(c=>{
  if(calm)return;
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',x*10+'deg');c.style.setProperty('--rx',-y*10+'deg')});
  c.addEventListener('mouseleave',()=>{c.style.setProperty('--ry','0deg');c.style.setProperty('--rx','0deg')});
});

/* visor de fotos con anterior / siguiente */
const lb=$('.lightbox'),im=$('img',lb),cap=$('figcaption',lb),cards=$$('.project-card');let cur=0;
const show=i=>{cur=(i+cards.length)%cards.length;im.src=cards[cur].dataset.full;cap.textContent=cards[cur].dataset.cap};
const open=i=>{show(i);lb.classList.add('open');lb.setAttribute('aria-hidden','false')};
const close=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true');im.src=''};
cards.forEach((c,i)=>c.addEventListener('click',()=>open(i)));
$('.lightbox-close').addEventListener('click',close);
$('.prev').addEventListener('click',()=>show(cur-1));$('.next').addEventListener('click',()=>show(cur+1));
lb.addEventListener('click',e=>{if(e.target===lb)close()});
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
