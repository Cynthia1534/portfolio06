(() => {
  const stage=document.querySelector('.badge-hero');
  const card=document.querySelector('.badge-sleeve');
  if(!stage||!card)return;
  const bands={left:stage.querySelector('.badge-cord .band-left'),right:stage.querySelector('.badge-cord .band-right')};
  const bandParts={left:[...bands.left.querySelectorAll('path:not(.band-edge-light):not(.band-edge-dark)')],right:[...bands.right.querySelectorAll('path:not(.band-edge-light):not(.band-edge-dark)')]};
  const edgeParts={leftLight:bands.left.querySelector('.band-edge-light'),rightLight:bands.right.querySelector('.band-edge-light'),leftDark:bands.left.querySelector('.band-edge-dark'),rightDark:bands.right.querySelector('.band-edge-dark')};
  const svg=stage.querySelector('.badge-cord');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let w=0,h=0,restY=0,x=0,y=0,vx=0,vy=0,angle=0,drag=null,frame=0,last=0,visible=true,suppressClick=false,swingDirection=1,entrance=null;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function paint(){
    card.style.transform=`translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;
    const radians=angle*Math.PI/180;
    // Tuck both cloth ends well inside the clasp so no diagonal cut edge peeks out.
    const cx=w/2+x+Math.sin(radians)*28,cy=restY+y-28-Math.cos(radians)*12;
    const start=-20,spread=w<760?59:119;
    // The flat webbing stays taut while the badge moves.
    const slack=clamp(-y*.12-vy*.28,-4,12);
    const span=cy-start;
    const sample=(p0,p1,p2,p3,t)=>{
      const u=1-t;
      const px=u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0];
      const py=u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1];
      const dx=3*u*u*(p1[0]-p0[0])+6*u*t*(p2[0]-p1[0])+3*t*t*(p3[0]-p2[0]);
      const dy=3*u*u*(p1[1]-p0[1])+6*u*t*(p2[1]-p1[1])+3*t*t*(p3[1]-p2[1]);
      const len=Math.hypot(dx,dy)||1;
      const width=(w<760?28:34)*(1-.09*t);
      const nx=-dy/len*width/2,ny=dx/len*width/2;
      return {a:[px+nx,py+ny],b:[px-nx,py-ny]};
    };
    const ribbon=(side)=>{
      const sign=side==='left'?-1:1;
      const p0=[w/2+sign*spread,start];
      const p3=[cx+sign*14,cy];
      const p1=[p0[0]+(p3[0]-p0[0])*.33+sign*slack*.13,start+span*.33];
      const p2=[p0[0]+(p3[0]-p0[0])*.67+sign*slack*.3,start+span*.67];
      const points=Array.from({length:25},(_,i)=>sample(p0,p1,p2,p3,i/24));
      const format=p=>`${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
      const line=pts=>'M '+pts.map(format).join(' L ');
      const shape=line(points.map(p=>p.a))+' L '+points.map(p=>format(p.b)).reverse().join(' L ')+' Z';
      return {shape,light:line(points.map(p=>p.a)),dark:line(points.map(p=>p.b))};
    };
    const left=ribbon('left'),right=ribbon('right');
    bandParts.left.forEach(p=>p.setAttribute('d',left.shape));
    bandParts.right.forEach(p=>p.setAttribute('d',right.shape));
    edgeParts.leftLight.setAttribute('d',left.light);
    edgeParts.rightLight.setAttribute('d',right.light);
    edgeParts.leftDark.setAttribute('d',left.dark);
    edgeParts.rightDark.setAttribute('d',right.dark);
  }
  function measure(){w=stage.clientWidth;h=stage.clientHeight;restY=card.offsetTop;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);x=clamp(x,-w*.3,w*.3);paint();}
  function tick(now){
    frame=0;const dt=Math.min((now-last)/16.667||1,2);last=now;
    if(!drag){
      if(entrance==='click-sway')vx+=(-x*.012-vx*.065)*dt;
      else vx+=(-x*.025-vx*.15)*dt;
      if(entrance==='drop'){
        // Gravity first, then a lightly damped spring catches the badge.
        vy+=.32*dt;
        if(y>=-12)entrance='settle';
      }else if(entrance==='click-lift'){
        vy+=(-y*.025-vy*.13)*dt;
        if(vy>=0){entrance='click-sway';vx=swingDirection*3.2;}
      }else if(entrance==='click-sway'){
        vy+=(-y*.022-vy*.11)*dt;
      }else if(entrance==='settle'){
        vy+=(-y*.032-vy*.105)*dt;
      }else{
        vy+=(-y*.04-vy*.2)*dt;
      }
      x+=vx*dt;y+=vy*dt;
      angle+=(clamp(x*.055+vx*.8,-23,23)-angle)*Math.min(.12*dt,1);
      if(Math.abs(x)+Math.abs(y)+Math.abs(vx)+Math.abs(vy)+Math.abs(angle)<.08){x=y=vx=vy=angle=0;entrance=null;paint();return;}
    }
    paint();if(!drag&&visible)frame=requestAnimationFrame(tick);
  }
  function animate(){if(!frame&&visible){last=performance.now();frame=requestAnimationFrame(tick);}}
  function reset(){entrance=null;x=y=vx=vy=angle=0;paint();}
  function swing(){
    if(reduce.matches)return;
    // First shorten the hanging length, then release a slower side-to-side sway.
    entrance='click-lift';
    swingDirection*=-1;
    vx=0;vy=-4.5;
    animate();
  }
  card.addEventListener('click',()=>{
    if(suppressClick){suppressClick=false;return;}
    swing();
  });
  card.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    entrance=null;
    suppressClick=false;card.setPointerCapture(e.pointerId);drag={id:e.pointerId,px:e.clientX,py:e.clientY,x,y,moved:false};vx=vy=0;e.preventDefault();
  });
  card.addEventListener('pointermove',e=>{
    if(!drag||drag.id!==e.pointerId)return;
    if(Math.hypot(e.clientX-drag.px,e.clientY-drag.py)>5)drag.moved=true;
    if(!drag.moved)return;
    const nx=clamp(drag.x+e.clientX-drag.px,-Math.min(w*.32,300),Math.min(w*.32,300));
    const ny=clamp(drag.y+e.clientY-drag.py,-105,65);
    vx=clamp(nx-x,-18,18);vy=clamp(ny-y,-14,14);x=nx;y=ny;angle=clamp(x*.07,-22,22);paint();
  });
  function release(e){if(!drag||drag.id!==e.pointerId)return;suppressClick=drag.moved||e.type!=='pointerup';drag=null;if(card.hasPointerCapture(e.pointerId))card.releasePointerCapture(e.pointerId);if(reduce.matches)reset();else animate();}
  card.addEventListener('pointerup',release);card.addEventListener('pointercancel',release);card.addEventListener('lostpointercapture',e=>{if(drag)release(e);});
  card.addEventListener('keydown',e=>{
    const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter',' ','Escape'];if(!keys.includes(e.key))return;e.preventDefault();
    if(e.key==='Escape'){reset();return;}
    if(e.key==='Enter'||e.key===' '){if(!e.repeat)swing();return;}
    entrance=null;
    if(e.key==='ArrowLeft')x-=35;if(e.key==='ArrowRight')x+=35;if(e.key==='ArrowUp')y-=20;if(e.key==='ArrowDown')y+=20;
    x=clamp(x,-w*.3,w*.3);y=clamp(y,-105,65);paint();if(!reduce.matches)animate();
  });
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)animate();else if(frame){cancelAnimationFrame(frame);frame=0;}},{threshold:.01});observer.observe(stage);
  new ResizeObserver(measure).observe(stage);
  reduce.addEventListener('change',()=>{if(reduce.matches)reset();});
  measure();
  // On entry the badge drops into the cord, rebounds gently, then settles.
  if(!reduce.matches){
    entrance='drop';x=-10;y=-108;vx=.25;vy=0;angle=-2;
    paint();animate();
  }
})();
