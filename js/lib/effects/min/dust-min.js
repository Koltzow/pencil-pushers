define(function(){var t={particles:[],l:20,s:0,c:["rgba(255,255,255,1)"],skip:3};return t.add=function(t,i){if(this.skip>0)return void this.skip--;this.skip=3;var r=2*Math.random()*Math.PI,s=Math.random()*this.s,a=this.l;this.particles.push({x:t,y:i,l:a,r:s,c:this.c[Math.floor(Math.random()*this.c.length)]})},t.update=function(){for(var t=0;t<this.particles.length;t++){this.particles[t].l--,this.particles[t].r+=Math.random(),this.particles[t].y-=Math.random()/2,this.particles[t].x+=2*Math.random()-1;var i=.5/this.l*this.particles[t].l;this.particles[t].c="rgba(255,255,255, "+i+")",this.particles[t].l<0&&this.particles.splice(t,1)}},t.render=function(){if(this.particles.length<1)return!1;for(var t=0;t<this.particles.length;t++)EXP.engine.ctx.fillStyle=this.particles[t].c,EXP.engine.ctx.fillRect(Math.round(this.particles[t].x+EXP.engine.width/2-EXP.camera.x-this.particles[t].r/2),Math.round(this.particles[t].y+EXP.engine.height/2-EXP.camera.y-this.particles[t].r/2),Math.round(this.particles[t].r),Math.round(this.particles[t].r))},t});