const slides = document.querySelectorAll('.slide');
const dotsEl = document.getElementById('dots');
const snumEl = document.getElementById('snum');
let cur = 0;

// build dots
slides.forEach((_,i)=>{
  const d = document.createElement('div');
  d.className = 'dot' + (i===0?' active':'');
  d.onclick = ()=>goTo(i);
  dotsEl.appendChild(d);
});

function goTo(n){
  slides[cur].classList.remove('active');
  dotsEl.children[cur].classList.remove('active');
  cur = (n + slides.length) % slides.length;
  slides[cur].classList.add('active');
  dotsEl.children[cur].classList.add('active');
  snumEl.textContent = (cur+1)+' / '+slides.length;
}
function go(d){ goTo(cur+d); }

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowDown') go(1);
  if(e.key==='ArrowLeft'||e.key==='ArrowUp') go(-1);
});
